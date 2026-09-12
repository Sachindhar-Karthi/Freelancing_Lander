"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { sampleProjects, PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { MOTION_EASE, SPRING_INDICATOR } from "@/lib/motion";
import { ProjectModal } from "./project-modal";
import { CommandMenu } from "./command-menu";

export interface ProjectShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  initialCategory?: ProjectCategory;
}

export function ProjectShowcase({
  className,
  initialCategory = "All",
  ...props
}: ProjectShowcaseProps = {}) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Filter projects based on active tab
  const filteredProjects = activeCategory === "All"
    ? sampleProjects
    : sampleProjects.filter((p) => p.category === activeCategory);

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const supportingProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <>
      <section 
        className={cn(
          "relative py-20 md:py-28 px-6 bg-[var(--surface-muted)]/30 backdrop-blur-lg border-b border-[var(--border)] z-20",
          className
        )} 
        id="work"
        {...props}
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{"// Selected Works & Case Studies"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-3">
                Crafted for performance & utility.
              </h2>
              <p className="text-base text-[var(--foreground-muted)] leading-relaxed">
                Explore production prototypes and systems engineering studies. All projects below are sample case studies demonstrating our architectural methodology.
              </p>
            </div>

            {/* Quick Command Menu Trigger */}
            <div className="shrink-0">
              <button
                type="button"
                aria-label="Open command palette"
                onClick={() => setIsCmdOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-sm font-medium text-[var(--foreground)] transition-colors shadow-xs active:scale-[0.98]"
              >
                <Search className="w-4 h-4 text-[var(--foreground-muted)]" />
                <span>Search catalog</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[var(--surface-muted)] border border-[var(--border)] font-mono text-[10px] text-[var(--foreground-muted)] ml-1">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>

          {/* Project Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "text-[var(--accent-foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] bg-[var(--surface)]/60 border border-[var(--border)]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={SPRING_INDICATOR}
                    />
                  )}
                  <span className="relative z-10 font-semibold">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Project Grid: 1 Large Featured Project + Supporting Grid */}
          <div className="space-y-6 lg:space-y-8">
            {/* Featured Hero Project */}
            {featuredProject && (
              <motion.div
                layout
                key={featuredProject.id}
                className="group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual Preview */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[260px] sm:min-h-[300px] overflow-hidden bg-[var(--surface-muted)] border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-md text-[var(--foreground)] border border-[var(--border)] text-xs font-mono font-semibold">
                      {featuredProject.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-md text-[var(--foreground-muted)] border border-[var(--border)] text-xs font-mono">
                      {featuredProject.status}
                    </span>
                  </div>
                </div>

                {/* Narrative Context */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--foreground-muted)] mb-3">
                      <span>Featured Case Study</span>
                      <span>•</span>
                      <span>{featuredProject.role}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)] mb-3">
                      {featuredProject.title}
                    </h3>

                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-6">
                      {featuredProject.summary}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-1.5">
                          Engineering Challenge
                        </h4>
                        <p className="text-xs text-[var(--foreground)] leading-relaxed">
                          {featuredProject.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-1.5">
                          Core Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {featuredProject.tools.map((tool) => (
                            <span
                              key={`${featuredProject.id}-tool-${tool}`}
                              className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs font-mono text-[var(--foreground-muted)]">
                      {featuredProject.outcome}
                    </span>
                    <button
                      type="button"
                      aria-label={`Inspect case study for ${featuredProject.title}`}
                      onClick={() => setSelectedProject(featuredProject)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-foreground)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-4 py-2.5 rounded-full transition-all shadow-xs active:scale-[0.98] shrink-0"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Supporting Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {supportingProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24, ease: MOTION_EASE }}
                    key={project.id}
                    className="group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative w-full h-48 overflow-hidden bg-[var(--surface-muted)] border-b border-[var(--border)]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-[var(--surface)]/90 backdrop-blur-xs border border-[var(--border)] text-[10px] font-mono text-[var(--foreground)] font-semibold">
                            {project.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[var(--surface-muted)]/90 backdrop-blur-xs border border-[var(--border)] text-[10px] font-mono text-[var(--foreground-muted)] font-medium">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                          {project.title}
                        </h4>
                        <p className="text-[var(--foreground-muted)] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                          {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tools.slice(0, 3).map((tool) => (
                            <span key={`${project.id}-tool-${tool}`} className="text-[11px] font-mono text-[var(--foreground-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded border border-[var(--border)]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between border-t border-[var(--border)]/60 mt-auto gap-2">
                      <span className="text-[11px] font-mono text-[var(--foreground-muted)] truncate">
                        {project.outcome}
                      </span>
                      <button
                        type="button"
                        aria-label={`View details for ${project.title}`}
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--foreground)] hover:text-[var(--accent)] pt-3 transition-colors active:scale-[0.98] shrink-0"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global Command Menu */}
      <CommandMenu
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </>
  );
}
