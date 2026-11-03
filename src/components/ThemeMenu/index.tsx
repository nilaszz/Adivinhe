import { useCallback, useEffect, useRef, useState } from "react";

import { WORD_CATEGORIES, type WordCategoryId } from "../../utils/words";
import styles from "./style.module.css";

export type Theme = "light" | "dark" | "terminal";

type Props = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  wordCategory: WordCategoryId;
  onWordCategoryChange: (category: WordCategoryId) => void;
};

const CLOSE_ANIMATION_DURATION = 300;

const themeOptions: { value: Theme; label: string; description: string }[] = [
  { value: "light", label: "Claro", description: "Visual leve para ambientes iluminados" },
  { value: "dark", label: "Escuro", description: "Confortável para ambientes com pouca luz" },
  { value: "terminal", label: "Terminal", description: "Visual tecnológico em verde e preto" },
];

export function ThemeMenu({
  theme,
  onThemeChange,
  wordCategory,
  onWordCategoryChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsClosing(false);

    if (!isMounted) {
      setIsMounted(true);
      animationFrameRef.current = window.requestAnimationFrame(() => {
        setIsOpen(true);
        animationFrameRef.current = null;
      });
      return;
    }

    setIsOpen(true);
  }, [isMounted]);

  const closeMenu = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsOpen(false);
    setIsClosing(true);
    triggerRef.current?.focus();

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, CLOSE_ANIMATION_DURATION);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isOpen]);

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls="theme-drawer"
        onClick={openMenu}
      >
        <span aria-hidden="true">◐</span>
        Aparência
      </button>

      {isMounted && (
        <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Fechar menu de aparência"
            onClick={closeMenu}
          />
          <aside
            ref={drawerRef}
            id="theme-drawer"
            className={`${styles.drawer} ${isClosing ? styles.drawerClosing : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-drawer-title"
          >
            <header className={styles.header}>
              <div>
                <p className={styles.eyebrow}>PERSONALIZAÇÃO</p>
                <h2 id="theme-drawer-title">Aparência</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                aria-label="Fechar menu de aparência"
                onClick={closeMenu}
              >
                ×
              </button>
            </header>

            <p className={styles.description}>Personalize a aparência e escolha os assuntos das palavras.</p>

            <section className={styles.section} aria-labelledby="visual-theme-title">
              <h3 id="visual-theme-title" className={styles.sectionTitle}>Tema visual</h3>
              <div className={styles.options} role="group" aria-label="Tema visual do jogo">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={styles.option}
                    aria-pressed={theme === option.value}
                    onClick={() => onThemeChange(option.value)}
                  >
                    <span
                      className={`${styles.preview} ${styles[option.value]}`}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className={styles.optionText}>
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </span>
                    <span className={styles.check} aria-hidden="true">
                      {theme === option.value ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="word-category-title">
              <h3 id="word-category-title" className={styles.sectionTitle}>Tema das palavras</h3>
              <div className={styles.categoryOptions} role="group" aria-label="Tema das palavras">
                {WORD_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={styles.categoryOption}
                    aria-pressed={wordCategory === category.id}
                    onClick={() => onWordCategoryChange(category.id)}
                  >
                    <span className={styles.categoryText}>
                      <strong>{category.label}</strong>
                      <span>{category.description}</span>
                    </span>
                    <span className={styles.check} aria-hidden="true">
                      {wordCategory === category.id ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
              <p className={styles.categoryHint}>A troca inicia uma nova partida.</p>
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
