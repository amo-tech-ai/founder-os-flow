import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Calendar, Link2, MessageSquare, CheckCircle2, Video, Clock } from "lucide-react";

const FeatureEvents = () => {
  const howItWorks = [
    { icon: Calendar, text: "Tracks meetings, demos, and events" },
    { icon: Link2, text: "Links meetings to investors, tasks, and goals" },
    { icon: MessageSquare, text: "Suggests follow-ups automatically" },
  ];

  const benefits = [
    "No dropped conversations",
    "Better meeting outcomes",
    "Clear next steps after every call",
  ];

  const meetings = [
    { time: "10:00 AM", title: "Partner Call — Sequoia", type: "video", followUp: "Send deck updates" },
    { time: "2:00 PM", title: "Product Demo — Enterprise Lead", type: "video", followUp: "Proposal follow-up" },
    { time: "4:30 PM", title: "Advisor Check-in", type: "call", followUp: "Share metrics update" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Explanation */}
          <MotionWrapper>
            <span className="inline-block px-3 py-1 rounded-full bg-gold-light/50 text-xs font-medium text-foreground mb-4">
              Feature 05
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Events, Meetings & Follow-Ups
            </h2>
            
            <div className="space-y-4 mb-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-cream/50 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gold-light/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="body-base pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-sage-light/30 border border-sage/20">
              <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>

          {/* Right: Calendar Visual */}
          <MotionWrapper delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/30 to-sage-light/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border/50 bg-cream/30 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Today's Schedule</h3>
                  <span className="text-xs text-muted-foreground">Monday, Jan 13</span>
                </div>
                
                {/* Meetings */}
                <div className="p-4 space-y-3">
                  {meetings.map((meeting, index) => (
                    <div key={index} className="p-4 rounded-xl bg-cream/50 border border-border/30 hover:border-gold/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{meeting.time}</span>
                        </div>
                        {meeting.type === "video" && <Video className="w-4 h-4 text-gold" />}
                      </div>
                      <p className="font-medium text-foreground text-sm mb-2">{meeting.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span>Suggested follow-up: {meeting.followUp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="px-6 py-4 border-t border-border/50 bg-cream/20">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex-1 h-1 bg-gradient-to-r from-gold-light to-sage-light rounded-full" />
                    <span>3 meetings • 2 follow-ups due</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default FeatureEvents;
