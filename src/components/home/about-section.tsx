"use client";

import { motion } from "motion/react";
import { profileData } from "@/data/profile";
import { CheckCircle2, ChevronRight, Code2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-surface-variant/30 border-t border-border/50 relative overflow-hidden">
      <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,var(--primary-light)_0,transparent_50%)] opacity-[0.03] pointer-events-none rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Story */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                About
              </h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-text mb-8 leading-tight">
                Engineering <br /> meets product.
              </h3>
              
              <div className="prose prose-invert max-w-none text-text-secondary text-lg leading-relaxed space-y-6">
                <p>
                  I'm <strong className="text-text font-medium">{profileData.name}</strong>, a {profileData.role}. {profileData.shortIntro}
                </p>
                <p>
                  {profileData.description}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-border/50">
                <h4 className="text-sm font-bold uppercase tracking-wider text-text mb-6">Technical Focus</h4>
                <ul className="space-y-4">
                  {profileData.technicalFocus.map((focus, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 text-text-secondary"
                    >
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span>{focus}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {profileData.skillGroups.map((group, groupIndex) => (
              <div 
                key={group.id} 
                className="bg-surface/50 backdrop-blur-md border border-border/80 rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:bg-surface transition-all duration-300 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-text mb-6 flex items-center gap-2 relative z-10">
                  <Code2 size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {group.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-background/80 text-sm font-medium text-text-secondary border border-border/50 hover:text-text hover:bg-surface-variant transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
