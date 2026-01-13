import { Building2, Globe, Users, Calendar, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCompany } from '@/data/mockData';

const stages = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B+' },
];

export default function CompanyProfile() {
  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-section">Company Profile</h1>
        <p className="body-base mt-1">Manage your startup information</p>
      </div>

      {/* Form */}
      <div className="card-elevated space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="company-name" defaultValue={mockCompany.name} className="pl-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="website" defaultValue={mockCompany.website || ''} className="pl-10" placeholder="https://" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" defaultValue={mockCompany.industry || ''} placeholder="e.g., SaaS, Fintech" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select defaultValue={mockCompany.stage}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-size">Team Size</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="team-size" 
                type="number" 
                defaultValue={mockCompany.team_size || ''} 
                className="pl-10" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="founded">Founded</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="founded" 
                type="date" 
                defaultValue={mockCompany.founded_at?.split('T')[0] || ''} 
                className="pl-10" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            defaultValue={mockCompany.description || ''} 
            placeholder="What does your company do?"
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
