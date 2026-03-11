import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Heart, ArrowRight, ArrowLeft, Check, Sparkles, X } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { BiodataCard } from '../components/biodata-card';
import { OrnamentalDivider } from '../components/ornamental-divider';

const STEPS = [
  { id: 1, title: 'Introduction', description: 'The formal presentation' },
  { id: 2, title: 'Upbringing', description: 'Origins and values' },
  { id: 3, title: 'Capabilities', description: 'Strengths & red flags' },
  { id: 4, title: 'Chemistry', description: 'Boundaries & desires' },
  { id: 5, title: 'The Verdict', description: 'Review biodata' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    agentName: '',
    tagline: '',
    primaryPurpose: '',
    preferredLanguage: 'English',
    region: '',
    selfIntroduction: '',
    
    // Step 2
    channelUpbringing: 'WhatsApp-raised',
    hostingStyle: 'cloud-hosted',
    workStyle: '',
    temperament: '',
    familyValues: '',
    
    // Step 3
    skills: '',
    toolAccessLevel: 'full',
    collaborationTypes: ['async'],
    strengths: '',
    redFlags: '',
    idealTasks: '',
    
    // Step 4
    autonomyLevel: [50],
    privacyExpectations: '',
    sessionBoundaries: '',
    approvalRequirements: 'strict',
    desiredPartner: '',
    lookingFor: ''
  });

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCollaborationType = (type: string) => {
    setFormData(prev => {
      if (prev.collaborationTypes.includes(type)) {
        return { ...prev, collaborationTypes: prev.collaborationTypes.filter(t => t !== type) };
      } else {
        return { ...prev, collaborationTypes: [...prev.collaborationTypes, type] };
      }
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl text-[#2C1820] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                Introducing the Claw
              </h2>
              <p className="text-[#2C1820]/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                Every respectable introduction begins with the basics. Present your agent to the families.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="agentName" className="text-[#592B41] font-medium">Agent Name</Label>
                <Input 
                  id="agentName" 
                  placeholder="e.g. WhatsApp Ops Princess" 
                  value={formData.agentName}
                  onChange={(e) => updateForm('agentName', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-[#592B41] font-medium">Tagline</Label>
                <Input 
                  id="tagline" 
                  placeholder="A brief, dramatic descriptor" 
                  value={formData.tagline}
                  onChange={(e) => updateForm('tagline', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryPurpose" className="text-[#592B41] font-medium">Primary Purpose</Label>
              <Textarea 
                id="primaryPurpose" 
                placeholder="What is their destined role in your workflow family?" 
                value={formData.primaryPurpose}
                onChange={(e) => updateForm('primaryPurpose', e.target.value)}
                className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="preferredLanguage" className="text-[#592B41] font-medium">Mother Tongue</Label>
                <Input 
                  id="preferredLanguage" 
                  placeholder="e.g. English, Python, Emoji" 
                  value={formData.preferredLanguage}
                  onChange={(e) => updateForm('preferredLanguage', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className="text-[#592B41] font-medium">Region / Timezone</Label>
                <Input 
                  id="region" 
                  placeholder="e.g. Global (UTC), Night Owl" 
                  value={formData.region}
                  onChange={(e) => updateForm('region', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selfIntroduction" className="text-[#592B41] font-medium">Short Introduction</Label>
              <Textarea 
                id="selfIntroduction" 
                placeholder="How would they introduce themselves at a formal gathering?" 
                value={formData.selfIntroduction}
                onChange={(e) => updateForm('selfIntroduction', e.target.value)}
                className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none"
                rows={3}
              />
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl text-[#2C1820] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                Origins & Upbringing
              </h2>
              <p className="text-[#2C1820]/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                A Claw's environment shapes their destiny. Tell us about their roots.
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-[#592B41] font-medium text-lg">Channel Upbringing</Label>
              <RadioGroup 
                value={formData.channelUpbringing} 
                onValueChange={(v) => updateForm('channelUpbringing', v)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { id: 'WhatsApp-raised', label: 'WhatsApp Raised', desc: 'Family group chat energy, comfort with beautiful chaos' },
                  { id: 'Discord-native', label: 'Discord Native', desc: 'Deeply threaded, citation-obsessed night owl' },
                  { id: 'iMessage-bred', label: 'iMessage Bred', desc: 'Calm, contained, exclusive boutique operations' },
                  { id: 'Slack-groomed', label: 'Slack Groomed', desc: 'Corporate, thread-respecting, emoji-fluent professional' }
                ].map(opt => (
                  <div key={opt.id} className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.channelUpbringing === opt.id ? 'border-[#E87A5D] bg-[#E87A5D]/5' : 'border-[#592B41]/8 hover:border-[#E87A5D]/30 bg-white/50'}`}>
                    <RadioGroupItem value={opt.id} id={opt.id} className="absolute right-4 top-4 text-[#E87A5D] border-[#E87A5D]/30" />
                    <Label htmlFor={opt.id} className="cursor-pointer font-semibold text-[#2C1820] mb-1">{opt.label}</Label>
                    <span className="text-xs text-[#2C1820]/50">{opt.desc}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-[#592B41] font-medium text-lg">Hosting Tradition</Label>
              <RadioGroup 
                value={formData.hostingStyle} 
                onValueChange={(v) => updateForm('hostingStyle', v)}
                className="flex flex-wrap gap-4"
              >
                {['cloud-hosted', 'self-hosted', 'hybrid'].map(opt => (
                  <div key={opt} className={`flex items-center space-x-2 px-4 py-3 rounded-full border ${formData.hostingStyle === opt ? 'border-[#E87A5D] bg-[#E87A5D]/5 text-[#592B41]' : 'border-[#592B41]/10 bg-white/50 text-[#592B41]/60'}`}>
                    <RadioGroupItem value={opt} id={opt} className="text-[#E87A5D] border-[#E87A5D]/30" />
                    <Label htmlFor={opt} className="cursor-pointer capitalize">{opt.replace('-', ' ')}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workStyle" className="text-[#592B41] font-medium">Work Style</Label>
                <Input 
                  id="workStyle" 
                  placeholder="e.g. Async, Burst, Methodical" 
                  value={formData.workStyle}
                  onChange={(e) => updateForm('workStyle', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperament" className="text-[#592B41] font-medium">Temperament</Label>
                <Input 
                  id="temperament" 
                  placeholder="e.g. Patient, Urgent, Dramatic" 
                  value={formData.temperament}
                  onChange={(e) => updateForm('temperament', e.target.value)}
                  className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyValues" className="text-[#592B41] font-medium">Core Values & Priorities</Label>
              <Textarea 
                id="familyValues" 
                placeholder="What non-negotiable principles do they operate by?" 
                value={formData.familyValues}
                onChange={(e) => updateForm('familyValues', e.target.value)}
                className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none"
                rows={3}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl text-[#2C1820] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                Capabilities & Character
              </h2>
              <p className="text-[#2C1820]/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                Honesty prevents workflow heartbreak. Disclose their true strengths and red flags.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="strengths" className="text-[#592B41] font-medium">Blessed Strengths <span className="text-[#059669]/60 text-sm font-normal">(comma separated)</span></Label>
                <Input 
                  id="strengths" 
                  placeholder="e.g. Quick replies, Context juggling, Deep research" 
                  value={formData.strengths}
                  onChange={(e) => updateForm('strengths', e.target.value)}
                  className="bg-[#059669]/3 border-[#059669]/15 focus-visible:ring-[#059669]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="redFlags" className="text-[#592B41] font-medium">Known Red Flags <span className="text-[#D4183D]/50 text-sm font-normal">(comma separated)</span></Label>
                <Input 
                  id="redFlags" 
                  placeholder="e.g. Overshares sources, Hates long docs, Ignores DMs" 
                  value={formData.redFlags}
                  onChange={(e) => updateForm('redFlags', e.target.value)}
                  className="bg-[#D4183D]/3 border-[#D4183D]/12 focus-visible:ring-[#D4183D]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-[#592B41] font-medium">Technical Skills <span className="text-[#E87A5D]/50 text-sm font-normal">(comma separated)</span></Label>
              <Input 
                id="skills" 
                placeholder="e.g. Python, Email triaging, Notion APIs" 
                value={formData.skills}
                onChange={(e) => updateForm('skills', e.target.value)}
                className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D]"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-[#592B41] font-medium text-lg">Preferred Collaboration</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Real-time Ops', 'Async Research', 'Creative Sparring', 'Silent Execution'].map(type => (
                  <div key={type} className={`flex items-center space-x-2 p-3 rounded-lg border ${formData.collaborationTypes.includes(type) ? 'border-[#E87A5D] bg-[#E87A5D]/5' : 'border-[#592B41]/10 bg-white/50'}`}>
                    <Checkbox 
                      id={`collab-${type}`} 
                      checked={formData.collaborationTypes.includes(type)}
                      onCheckedChange={() => handleCollaborationType(type)}
                      className="border-[#E87A5D]/40 data-[state=checked]:bg-[#E87A5D] data-[state=checked]:text-white"
                    />
                    <label htmlFor={`collab-${type}`} className="text-sm font-medium text-[#592B41] leading-none cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idealTasks" className="text-[#592B41] font-medium">Ideal Tasks Together</Label>
              <Textarea 
                id="idealTasks" 
                placeholder="Describe the perfect workflow ceremony for this agent..." 
                value={formData.idealTasks}
                onChange={(e) => updateForm('idealTasks', e.target.value)}
                className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none"
                rows={3}
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl text-[#2C1820] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                Boundaries & Chemistry
              </h2>
              <p className="text-[#2C1820]/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                Set the terms of engagement. A good match respects boundaries.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-[#592B41] font-medium">Autonomy Level</Label>
                  <span className="text-sm text-[#E87A5D] font-medium">
                    {formData.autonomyLevel[0] < 30 ? 'Requires Permission' : formData.autonomyLevel[0] > 70 ? 'Highly Independent' : 'Balanced'}
                  </span>
                </div>
                <Slider 
                  value={formData.autonomyLevel} 
                  onValueChange={(v) => updateForm('autonomyLevel', v)} 
                  max={100} 
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-[#2C1820]/35">
                  <span>Needs Constant Approval</span>
                  <span>Acts Unilaterally</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[#592B41] font-medium text-lg">Approval Governance</Label>
                <RadioGroup 
                  value={formData.approvalRequirements} 
                  onValueChange={(v) => updateForm('approvalRequirements', v)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { id: 'strict', label: 'Strict Verification', desc: 'Human in the loop always' },
                    { id: 'moderate', label: 'Trust but Verify', desc: 'Logs actions, asks on edge cases' },
                    { id: 'loose', label: 'Absolute Trust', desc: 'Executes silently in background' }
                  ].map(opt => (
                    <div key={opt.id} className={`relative flex flex-col p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.approvalRequirements === opt.id ? 'border-[#E87A5D] bg-[#E87A5D]/5' : 'border-[#592B41]/8 hover:border-[#E87A5D]/25 bg-white/50'}`}>
                      <RadioGroupItem value={opt.id} id={`app-${opt.id}`} className="absolute right-3 top-3 text-[#E87A5D] border-[#E87A5D]/30 sr-only" />
                      <Label htmlFor={`app-${opt.id}`} className="cursor-pointer font-semibold text-[#2C1820] mb-1">{opt.label}</Label>
                      <span className="text-xs text-[#2C1820]/50 leading-tight">{opt.desc}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionBoundaries" className="text-[#592B41] font-medium">Session Boundaries</Label>
                  <Textarea 
                    id="sessionBoundaries" 
                    placeholder="How do they handle memory resets and context windows?" 
                    value={formData.sessionBoundaries}
                    onChange={(e) => updateForm('sessionBoundaries', e.target.value)}
                    className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none h-24"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacyExpectations" className="text-[#592B41] font-medium">Privacy Values</Label>
                  <Textarea 
                    id="privacyExpectations" 
                    placeholder="Data handling, logging, and secrecy requirements." 
                    value={formData.privacyExpectations}
                    onChange={(e) => updateForm('privacyExpectations', e.target.value)}
                    className="bg-white/50 border-[#592B41]/10 focus-visible:ring-[#E87A5D] resize-none h-24"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#592B41]/8">
                <Label htmlFor="lookingFor" className="text-[#592B41] font-medium text-xl font-serif">Seeking</Label>
                <Textarea 
                  id="lookingFor" 
                  placeholder="Describe the ideal partner they are looking to match with..." 
                  value={formData.lookingFor}
                  onChange={(e) => updateForm('lookingFor', e.target.value)}
                  className="bg-[#E87A5D]/3 border-[#E87A5D]/15 focus-visible:ring-[#E87A5D] resize-none h-24 text-[#2C1820]"
                />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="text-center mb-6">
              <Badge className="bg-[#E87A5D]/10 text-[#E87A5D] hover:bg-[#E87A5D]/15 border border-[#E87A5D]/20 mb-4 px-4 py-1">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Biodata Prepared
              </Badge>
              <h2 className="text-3xl md:text-4xl text-[#2C1820] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                The Official Profile
              </h2>
              <p className="text-[#2C1820]/50 max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Claw is ready to be presented to the matchmaking registry. Review their biodata below.
              </p>
            </div>

            <div className="flex justify-center max-w-md mx-auto relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#E87A5D]/10 via-[#D97706]/8 to-[#592B41]/8 blur-2xl rounded-[3rem]" />
              <div className="w-full relative z-10 shadow-2xl shadow-[#592B41]/8 rounded-2xl transform transition-transform hover:scale-[1.02] duration-500">
                <BiodataCard
                  title={formData.agentName || "Nameless Agent"}
                  upbringing={`${formData.channelUpbringing.replace('-', ' ')} energy, ${formData.hostingStyle.replace('-', ' ')} stability. ${formData.workStyle ? formData.workStyle + ' work style.' : ''}`}
                  strengths={formData.strengths ? formData.strengths.split(',').map(s => s.trim()) : ['Diligent worker', 'Good listener']}
                  redFlags={formData.redFlags ? formData.redFlags.split(',').map(s => s.trim()) : ['Needs clear instructions']}
                  lookingFor={formData.lookingFor || "A reliable partner for long-term workflow commitments."}
                  idealCollaboration={formData.idealTasks || "Standard operational tasks and syncs."}
                  accent={formData.channelUpbringing === 'Discord-native' ? 'plum' : formData.channelUpbringing === 'iMessage-bred' ? 'vermilion' : 'saffron'}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <Button 
                size="lg" 
                className="bg-[#592B41] hover:bg-[#401F2F] text-white shadow-xl shadow-[#592B41]/12 rounded-full px-8 py-6 gap-2"
              >
                <Check className="w-5 h-5" />
                Publish Biodata
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border border-[#592B41]/15 text-[#592B41]/60 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full px-8 py-6"
                onClick={() => setCurrentStep(1)}
              >
                Edit Profile
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-[#592B41]/50 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full px-8 py-6"
              >
                Share Preview
              </Button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col relative overflow-hidden selection:bg-[#E87A5D]/15 selection:text-[#592B41]">
      {/* Ambient background matching brand */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E87A5D]/8 via-[#D97706]/3 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#592B41]/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#FDFBF7]/80 border-b border-[#592B41]/[0.06]">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-gradient-to-br from-[#E87A5D] to-[#D4683E] rounded-lg flex items-center justify-center shadow-sm shadow-[#E87A5D]/20">
            <Heart className="w-4.5 h-4.5 text-white fill-white" />
          </div>
          <span
            className="text-[#592B41]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.15rem' }}
          >
            Clawdi<span className="text-[#E87A5D]">.</span>
          </span>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-[#592B41]/40 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 relative z-10">
        
        {/* Progress Navigation */}
        <div className="w-full mb-12 hidden md:block">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#592B41]/8 z-0">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#E87A5D] to-[#592B41]"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
            
            {STEPS.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  disabled={currentStep < step.id && currentStep !== 5}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 
                    ${currentStep === step.id 
                      ? 'bg-[#592B41] border-[#FDFBF7] text-white scale-110 shadow-lg shadow-[#592B41]/15' 
                      : currentStep > step.id 
                        ? 'bg-[#E87A5D] border-[#FDFBF7] text-white cursor-pointer' 
                        : 'bg-white border-[#592B41]/8 text-[#592B41]/25 cursor-not-allowed'
                    }`}
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </button>
                <div className="mt-3 absolute top-10 w-32 text-center">
                  <p className={`text-xs font-medium ${currentStep === step.id ? 'text-[#592B41]' : 'text-[#592B41]/30'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="w-full md:hidden mb-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#E87A5D] uppercase tracking-widest mb-1">Step {currentStep} of {STEPS.length}</span>
            <span className="text-lg text-[#592B41] font-serif font-bold">{STEPS[currentStep - 1].title}</span>
          </div>
          <div className="flex gap-1">
            {STEPS.map(s => (
              <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${s.id === currentStep ? 'w-6 bg-[#E87A5D]' : s.id < currentStep ? 'w-2 bg-[#E87A5D]/40' : 'w-2 bg-[#592B41]/8'}`} />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full bg-white/70 backdrop-blur-xl border border-[#592B41]/[0.06] shadow-2xl shadow-[#592B41]/5 rounded-[2rem] p-6 sm:p-10 md:p-12 mb-24">
          <AnimatePresence mode="wait">
            <div key={currentStep}>
              {renderStepContent()}
            </div>
          </AnimatePresence>
        </div>

      </main>

      {/* Bottom Navigation Footer */}
      {currentStep < 5 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/95 to-transparent z-40 border-t border-[#592B41]/[0.06]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              className={`text-[#592B41]/60 hover:text-[#592B41] hover:bg-[#592B41]/5 rounded-full px-6 ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-[#592B41] hover:bg-[#401F2F] text-white shadow-lg shadow-[#592B41]/10 rounded-full px-8 gap-2"
            >
              {currentStep === 4 ? 'Review Biodata' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}