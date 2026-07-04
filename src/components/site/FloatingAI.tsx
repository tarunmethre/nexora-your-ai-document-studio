import { AnimatePresence, motion } from "framer-motion";
import { Mic, Paperclip, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";

const QUICK = [
  "Draft a business proposal",
  "Rewrite this in a formal tone",
  "Summarize meeting notes",
  "Improve grammar & clarity",
];

type Msg = { role: "user" | "ai"; text: string };

export function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm Nexora AI. What would you like to create today?" },
  ]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      {
        role: "ai",
        text: "Working on that — connect the Gemini backend to stream real completions here.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(true)}
        aria-label="Open Nexora AI"
        className="fixed bottom-24 md:bottom-8 right-5 md:right-8 z-40 size-14 rounded-full bg-foreground text-background shadow-2xl grid place-items-center group"
      >
        <Sparkles className="size-5 group-hover:rotate-12 transition-transform" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/30 via-accent-purple/30 to-accent-cyan/30 blur-xl -z-10" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 bottom-4 right-4 left-4 md:left-auto md:bottom-8 md:right-8 md:w-[420px] h-[600px] max-h-[85vh] bg-background rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-foreground text-background grid place-items-center">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Nexora AI</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Online · Gemini-ready
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-8 place-items-center rounded-full hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "ml-auto bg-foreground text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>

              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2">
                  <button className="grid size-8 place-items-center rounded-lg hover:bg-muted">
                    <Paperclip className="size-4 text-muted-foreground" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send(input)}
                    placeholder="Ask Nexora anything..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button className="grid size-8 place-items-center rounded-lg hover:bg-muted">
                    <Mic className="size-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => send(input)}
                    className="grid size-9 place-items-center rounded-xl bg-foreground text-background"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}