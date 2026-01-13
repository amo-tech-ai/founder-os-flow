import { useState } from 'react';
import { Plus, Search, Mail, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { mockContacts } from '@/data/mockData';
import type { ContactType } from '@/types/dashboard';

const typeFilters: { label: string; value: ContactType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Investors', value: 'investor' },
  { label: 'Customers', value: 'customer' },
  { label: 'Advisors', value: 'advisor' },
  { label: 'Partners', value: 'partner' },
];

const getTypeColor = (type: ContactType) => {
  switch (type) {
    case 'investor': return 'bg-purple-500/10 text-purple-600';
    case 'customer': return 'bg-blue-500/10 text-blue-600';
    case 'advisor': return 'bg-green-500/10 text-green-600';
    case 'partner': return 'bg-orange-500/10 text-orange-600';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function Contacts() {
  const [activeFilter, setActiveFilter] = useState<ContactType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact => {
    const matchesType = activeFilter === 'all' || contact.type === activeFilter;
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-section">Contacts</h1>
          <p className="body-base mt-1">Manage your network and relationships</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Contact
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeFilter === filter.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => {
          const initials = contact.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();

          return (
            <div key={contact.id} className="card-elevated hover:shadow-elevated transition-shadow">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{contact.name}</h3>
                  {contact.role && (
                    <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
                  )}
                  <Badge className={cn("mt-2", getTypeColor(contact.type))}>
                    {contact.type}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {contact.company && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate">{contact.company}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
              </div>

              {contact.last_contact_at && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Last contact: {new Date(contact.last_contact_at).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
