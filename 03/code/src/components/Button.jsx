import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../contex/ThemeContext";

const Button = ({
  children,
  className = "",
  icon: Icon = FiLock,
  animateText = false,
  onClick,
  ...props
}) => {
  const { theme } = useTheme();
  const intervalRef = useRef(null);

  const TARGET_TEXT = typeof children === "string" ? children : "Encrypt data";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];
          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  // Handlers para animación de texto
  const handleMouseEnter = (e) => {
    if (animateText) scramble();
    if (props.onMouseEnter) props.onMouseEnter(e);
  };
  const handleMouseLeave = (e) => {
    if (animateText) stopScramble();
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  // Clases para tema claro/oscuro
  const themeClasses =
    theme === "light"
      ? "border-zinc-300 bg-white text-zinc-800 hover:text-indigo-700"
      : "border-neutral-500 bg-neutral-700 text-neutral-300 hover:text-indigo-300";

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={
        "group relative overflow-hidden rounded-lg border-[1px] px-4 py-2 font-mono font-medium uppercase transition-colors " +
        themeClasses +
        " " +
        className
      }
      {...props}
    >
      <div className="relative z-10 flex items-center gap-2">
        {Icon && <Icon />}
        <span>{animateText ? text : children}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className={
          "duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        }
      />
    </motion.button>
  );
};

export default Button;