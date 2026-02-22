# PART 6 — Vector Database Strategy

> Knowledge base architecture for the Strategic Planning Agent
> Powers BCG-grade startup advice with retrieval-augmented generation (RAG)

---

## A. Why a Vector Database

The Strategic Planning Agent needs to give advice that's better than generic ChatGPT output. That requires domain-specific knowledge about:

- What makes AI startups succeed or fail
- Validation frameworks that actually work
- Industry benchmarks and metrics
- Best practices from YC, Techstars, a16z, and top accelerators
- Common patterns in revenue models, GTM strategies, team building

A vector database stores this knowledge as embeddings and retrieves the most relevant chunks when an agent needs context. This is RAG — Retrieval-Augmented Generation.

---

## B. What Gets Embedded

### Knowledge Category 1: Startup Frameworks
| Source | Content Type | Chunk Count (est.) |
|--------|-------------|-------------------|
| Lean Startup methodology | Principles, practices, anti-patterns | ~50 chunks |
| Business Model Canvas guides | Block-by-block best practices | ~45 chunks |
| Validation playbooks | Experiment designs, interview scripts | ~60 chunks |
| YC startup school content | Lectures, essays, advice | ~100 chunks |
| AI startup specific guides | Model selection, data strategy, MLOps | ~80 chunks |

### Knowledge Category 2: Industry Benchmarks
| Source | Content Type | Chunk Count (est.) |
|--------|-------------|-------------------|
| SaaS metrics benchmarks | ARR, churn, NRR, CAC/LTV by stage | ~30 chunks |
| AI company benchmarks | Compute costs, model accuracy, data needs | ~25 chunks |
| Funding benchmarks | Round sizes, valuations, dilution by stage | ~20 chunks |
| GTM benchmarks | CAC by channel, conversion rates, sales cycles | ~25 chunks |

### Knowledge Category 3: Report Templates
| Source | Content Type | Chunk Count (est.) |
|--------|-------------|-------------------|
| Validation report intros | Opening narratives per topic | ~9 chunks |
| Detail report structures | Section templates with prompts | ~45 chunks |
| Scoring rubrics | Sub-score definitions and thresholds | ~45 chunks |
| Action plan templates | Recommended experiments by gap type | ~30 chunks |

### Knowledge Category 4: Pattern Library
| Source | Content Type | Chunk Count (est.) |
|--------|-------------|-------------------|
| Revenue model patterns | SaaS, marketplace, API, freemium, enterprise | ~15 chunks |
| GTM playbooks | PLG, sales-led, community, partnership | ~20 chunks |
| Competition response patterns | Differentiation, positioning, moat building | ~15 chunks |
| Risk mitigation patterns | Technical, market, regulatory, team risks | ~20 chunks |

**Total estimated chunks: ~630**

---

## C. Technical Implementation

### Option 1: Supabase pgvector (Recommended for MVP)

Supabase natively supports pgvector. No additional infrastructure needed.

**Table structure:**
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,       -- 'framework' | 'benchmark' | 'template' | 'pattern'
  subcategory TEXT NOT NULL,    -- 'lean_startup' | 'saas_metrics' | etc.
  title TEXT NOT NULL,
  content TEXT NOT NULL,        -- The actual text chunk
  embedding VECTOR(1536),      -- OpenAI text-embedding-3-small dimension
  metadata JSONB DEFAULT '{}', -- Source URL, date, author, relevance tags
  created_at TIMESTAMPTZ DEFAULT now()
);

-- HNSW index for fast similarity search
CREATE INDEX ON knowledge_base
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

**Why pgvector over Pinecone/Weaviate:**
- Zero additional infrastructure cost
- Same RLS policies as rest of database
- Single transaction with other Supabase queries
- ~630 chunks is tiny — pgvector handles millions
- Edge functions can query directly via Supabase client

### Embedding Generation
```
Content chunk → OpenAI text-embedding-3-small → 1536-dim vector → Store in pgvector
```

**Cost estimate:**
- 630 chunks × ~200 tokens each = ~126,000 tokens
- text-embedding-3-small: $0.02 per 1M tokens
- One-time cost: ~$0.003 (essentially free)
- Per-query cost: ~$0.00002 per search

---

## D. RAG Pipeline

### Query Flow
```
User asks question or agent needs context
           ↓
    Generate query embedding
           ↓
    Search knowledge_base (top-k=5, similarity > 0.7)
           ↓
    Retrieve relevant chunks
           ↓
    Inject into agent prompt as context
           ↓
    Agent generates response with citations
```

### Edge Function: `vector-search`
```typescript
// POST /functions/v1/vector-search
// Input: { query: string, category?: string, top_k?: number }
// Output: { results: Array<{ content, title, similarity, metadata }> }

const embedding = await generateEmbedding(query);
const { data } = await supabase.rpc('match_knowledge', {
  query_embedding: embedding,
  match_threshold: 0.7,
  match_count: top_k || 5,
  filter_category: category || null
});
```

### Supabase RPC Function
```sql
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT,
  filter_category TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  category TEXT,
  subcategory TEXT,
  similarity FLOAT,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.title,
    kb.content,
    kb.category,
    kb.subcategory,
    1 - (kb.embedding <=> query_embedding) AS similarity,
    kb.metadata
  FROM knowledge_base kb
  WHERE (filter_category IS NULL OR kb.category = filter_category)
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

---

## E. Seeding the Knowledge Base

### Phase 1: Manual Curation (Core)
- Write 50 high-quality chunks covering the 9 validation topics
- Each chunk: 150–300 words, focused on one concept
- Include scoring rubric chunks for each sub-score
- Include report intro templates for each topic

### Phase 2: Framework Import (MVP)
- Import Lean Startup, Business Model Canvas frameworks
- Chunk and embed startup methodology content
- Add benchmark data from public sources

### Phase 3: Continuous Learning (Post-MVP)
- Track which chunks get retrieved most often
- A/B test chunk quality (do better chunks lead to better scores?)
- Add new chunks based on user questions that have no good matches
- Version chunks — update benchmarks annually

### Phase 4: User-Contributed (Advanced)
- Allow founders to contribute validated insights
- Community-reviewed knowledge additions
- Anonymized pattern learning from successful validations

---

## F. How Each Agent Uses the Vector DB

| Agent | Query Pattern | Category Filter | Purpose |
|-------|--------------|-----------------|---------|
| Profile Extractor | "AI startup in [industry]" | pattern | Get industry-specific extraction prompts |
| Lean Canvas Builder | "[block] best practices for [industry]" | framework | Generate informed canvas content |
| Validation Scorer | "scoring rubric for [topic]" | template | Apply consistent scoring criteria |
| Task Generator | "experiments for [validation gap]" | pattern | Suggest evidence-gathering tasks |
| Market Research | "[industry] market benchmarks" | benchmark | Contextualize market findings |
| Competition Analyzer | "competitive moat patterns for AI" | pattern | Framework for moat assessment |
| Revenue Simulator | "[model type] unit economics benchmarks" | benchmark | Calibrate projections |
| Risk Analyzer | "common risks for [stage] AI startups" | pattern | Comprehensive risk identification |
| Strategic Planner | "milestone frameworks for [stage]" | framework | Build phase-gated roadmaps |

---

## G. What NOT to Put in the Vector DB

- User-specific data (that goes in regular tables with RLS)
- Realtime data (benchmarks update quarterly at most)
- Generic knowledge Claude already has (don't duplicate the LLM's training)
- Copyrighted content verbatim (paraphrase and cite)
- Opinions without evidence (only include data-backed insights)
