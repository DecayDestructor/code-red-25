import React from 'react'
import { Sparkles, Skull, Scroll } from 'lucide-react'

const LockedPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 bg-[url('/api/placeholder/800/600')] bg-cover bg-center">
      <div className="max-w-xl w-full space-y-8 text-center bg-gray-900/95 p-8 rounded-lg border-4 border-purple-600/50 shadow-2xl relative overflow-hidden">
        {/* Magical glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 blur-[100px] -z-10" />

        <div className="flex flex-col items-center relative">
          {/* Magical seal */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skull className="h-8 w-8 text-purple-200" />
              </div>
            </div>
          </div>

          <h2 className="mt-12 text-4xl font-bold text-purple-200 font-serif">
            𝔄𝔯𝔠𝔞𝔫𝔢 𝔅𝔞𝔯𝔯𝔦𝔢𝔯
          </h2>

          <div className="flex items-center mt-4 space-x-4">
            <span className="text-2xl text-purple-400">✧</span>
            <span className="text-2xl text-purple-300">⚜️</span>
            <span className="text-2xl text-purple-400">✧</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg text-purple-200 font-medium">
            Thou hast encountered a mystical barrier, wandering soul.
          </p>
          <p className="mt-2 text-purple-300/80">
            The ancient magicks that guard this realm require greater power than
            thou currently possess. Seek the Archmage's blessing or await the
            alignment of celestial forces.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center py-3 px-6 rounded-lg
                     bg-purple-900 hover:bg-purple-800 text-purple-100
                     transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-purple-500/20
                     text-lg font-bold font-serif
                     border-2 border-purple-600/50
                     group"
          >
            <Scroll className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Return to the Mortal Realm
          </button>

          <p className="text-sm text-purple-400/80 italic">
            If thou suspect malevolent enchantments, summon the Council of
            Wizards or contact the Ethereal Support Circle
          </p>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-500/50" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-500/50" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-500/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/50" />
      </div>
    </div>
  )
}

export default LockedPage
