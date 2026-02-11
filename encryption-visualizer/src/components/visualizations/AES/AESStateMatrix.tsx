import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface AESStateMatrixProps {
  state: number[][];
  title?: string;
  highlightCells?: { row: number; col: number }[];
  showAnimation?: boolean;
  subtitle?: string;
}

export const AESStateMatrix: React.FC<AESStateMatrixProps> = ({
  state,
  title,
  highlightCells = [],
  showAnimation = true,
  subtitle,
}) => {
  const isHighlighted = (row: number, col: number) => {
    return highlightCells.some(cell => cell.row === row && cell.col === col);
  };

  const toHex = (byte: number) => {
    return byte.toString(16).padStart(2, '0').toUpperCase();
  };

  const toBinary = (byte: number) => {
    return byte.toString(2).padStart(8, '0');
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
          {subtitle && (
            <p className="text-sm text-white/50 font-medium">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="inline-block glass-card p-8 border-white/10 relative group">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl"></div>
        
        {/* Column labels */}
        <div className="flex justify-center mb-3 sm:mb-4 gap-2 sm:gap-3">
          {[0, 1, 2, 3].map((col) => (
            <div key={`col-${col}`} className="w-14 sm:w-16 md:w-20 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs font-bold text-cyan-400/70 font-mono">Col {col}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-rows-4 gap-2 sm:gap-3">
          {state.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex items-center gap-2 sm:gap-3">
              {/* Row label */}
              <div className="w-8 sm:w-10 md:w-12 flex items-center justify-end mr-1 sm:mr-2">
                <span className="text-[10px] sm:text-xs font-bold text-cyan-400/70 font-mono">R{rowIndex}</span>
              </div>
              
              {/* Cells */}
              {row.map((byte, colIndex) => {
                const highlighted = isHighlighted(rowIndex, colIndex);
                
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    initial={showAnimation ? { scale: 0.8, opacity: 0, rotateY: -90 } : false}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{
                      delay: showAnimation ? (rowIndex * 4 + colIndex) * 0.04 : 0,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className={`
                      relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold
                      transition-all duration-500 group/cell
                      ${
                        highlighted
                          ? 'matrix-cell-highlighted'
                          : 'matrix-cell'
                      }
                    `}
                  >
                    {/* Glow effect for highlighted cells */}
                    {highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-60 -z-10 animate-glow" />
                    )}
                    
                    {/* Byte value */}
                    <div className="relative z-10 text-center">
                      <div className={`text-sm sm:text-base font-mono tracking-wider ${highlighted ? 'text-white' : 'text-cyan-300'}`}>
                        {toHex(byte)}
                      </div>
                      <div className={`text-[9px] sm:text-[10px] mt-0.5 ${highlighted ? 'text-cyan-100' : 'text-white/40'}`}>
                        {byte}
                      </div>
                    </div>

                    {/* Enhanced tooltip on hover */}
                    <div className="tooltip">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
                          <Info className="w-3 h-3 text-cyan-400" />
                          <span className="font-semibold text-cyan-400">Byte Info</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                          <span className="text-white/50">Position:</span>
                          <span className="text-white font-mono">[{rowIndex}][{colIndex}]</span>
                          
                          <span className="text-white/50">Decimal:</span>
                          <span className="text-white font-mono">{byte}</span>
                          
                          <span className="text-white/50">Hex:</span>
                          <span className="text-white font-mono">0x{toHex(byte)}</span>
                          
                          <span className="text-white/50">Binary:</span>
                          <span className="text-white font-mono">{toBinary(byte)}</span>
                          
                          {byte >= 32 && byte < 127 && (
                            <>
                              <span className="text-white/50">ASCII:</span>
                              <span className="text-white font-mono">'{String.fromCharCode(byte)}'</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Shimmer effect on non-highlighted cells */}
                    {!highlighted && (
                      <div className="absolute inset-0 shimmer opacity-0 group-hover/cell:opacity-100 rounded-2xl"></div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Matrix info footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/40 font-mono">
            <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
            <span className="font-semibold">4×4 State Matrix</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10"></div>
          <div className="text-[10px] sm:text-xs text-white/40 font-mono">
            <span className="font-semibold">16 bytes</span> (128 bits)
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10"></div>
          <div className="text-[10px] sm:text-xs text-white/40 font-mono">
            <span className="font-semibold">Column-major</span> order
          </div>
        </div>
      </div>
    </div>
  );
};
