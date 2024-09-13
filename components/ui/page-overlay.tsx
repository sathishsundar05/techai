import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export function PageOverlay({ isVisible, onClose }: OverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black flex items-center justify-center"
          aria-hidden="true"
          onClick={onClose}
        >
          <motion.div
            animate={{
              rotate: [-180, 0, 180]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Loader size={30} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
