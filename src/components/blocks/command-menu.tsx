"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, FolderGit2 } from "lucide-react";
import { sampleProjects, type Project } from "@/data/projects";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function CommandMenu({ isOpen, onClose, onSelectProject }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter projects locally by title, category, services, tools
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleProjects;

    return sampleProjects.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchServices = p.services.some((s) => s.toLowerCase().includes(q));
      const matchTools = p.tools.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchServices || matchTools;
    });
  }, [query]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle keyboard navigation inside command menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredProjects.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % (filteredProjects.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredProjects[selectedIndex]) {
          onSelectProject(filteredProjects[selectedIndex]);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredProjects, selectedIndex, onSelectProject, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-menu-title"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface-muted)]">
          <Search className="w-5 h-5 text-[var(--foreground-muted)] shrink-0 mr-3" />
          <input
            ref={inputRef}
            id="cmd-menu-title"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by title, category, service, or tool..."
            className="w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] text-sm sm:text-base outline-none font-medium"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-[11px] text-[var(--foreground-muted)]">
            ESC
          </kbd>
        </div>

        {/* Project Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[var(--border)]/50">
          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--foreground-muted)]">
              <FolderGit2 className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--foreground)]" />
              <p>No sample projects match &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try &ldquo;Design&rdquo;, &ldquo;WebGL&rdquo;, &ldquo;React&rdquo;, or &ldquo;PWA&rdquo;</p>
            </div>
          ) : (
            filteredProjects.map((project, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[var(--accent-soft)]/60 text-[var(--foreground)] border border-[var(--border)]"
                      : "hover:bg-[var(--surface-muted)] text-[var(--foreground)]"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm truncate">{project.title}</span>
                      <span className="text-[11px] font-mono px-2 py-0.2 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground-muted)] shrink-0">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--border)]/40 text-[var(--foreground-muted)] shrink-0">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground-muted)] truncate">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span key={i} className="text-[10px] font-mono text-[var(--foreground-muted)] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-[var(--foreground-muted)]">
                    {isSelected && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[var(--foreground)] font-semibold">
                        <span>Open</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {!isSelected && <ArrowRight className="w-4 h-4 opacity-40" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-[var(--surface-muted)] border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to inspect</span>
            <span>esc to dismiss</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--accent)]" />
            <span>Local Instant Filter</span>
          </span>
        </div>
      </div>
    </div>
  );
}
