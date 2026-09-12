"use client";

import { motion } from "motion/react";
import { profileData } from "@/data/profile";
import { Terminal } from "lucide-react";

export function EngineeringPhilosophy() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        <div className="mb-16 md:mb-24 md:text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
              How I Think
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Engineering isn&apos;t just about writing code. It&apos;s about designing systems that are reliable, maintainable, and aligned with user needs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {profileData.engineeringPhilosophy.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-variant/30 border border-border/50 rounded-2xl p-8 lg:p-10 relative overflow-hidden group hover:bg-surface-variant/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
              
              <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center mb-8 relative z-10">
                <Terminal size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-text mb-4 relative z-10">
                {principle.title}
              </h3>
              <p className="text-text-secondary leading-relaxed relative z-10">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
