import React from 'react'
import { Shield, Sword, Skull } from 'lucide-react'

const LockedPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 bg-[url('/api/placeholder/800/600')] bg-cover bg-center">
      <div className="max-w-xl w-full space-y-8 text-center bg-gray-900/95 p-8 rounded-lg border-4 border-red-900/50 shadow-2xl relative overflow-hidden">
        {/* Atmospheric effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/10 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-900/10 blur-[100px] -z-10" />

        <div className="flex flex-col items-center relative">
          {/* Battle emblem */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Shield className="h-16 w-16 text-red-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skull className="h-8 w-8 text-gray-200" />
              </div>
            </div>
          </div>

          <h2 className="mt-12 text-4xl font-bold text-gray-200 font-serif">
            Warrior's Challenge
          </h2>

          <div className="flex items-center mt-4 space-x-4">
            <Sword className="h-6 w-6 text-red-600 rotate-45" />
            <span className="text-2xl text-red-600">†</span>
            <Sword className="h-6 w-6 text-red-600 -rotate-45" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg text-gray-200 font-medium">
            Halt, warrior! Your path is blocked.
          </p>
          <p className="mt-2 text-gray-300/80">
            This battlefield lies beyond your current strength. Seek the
            Warlord's favor or prove your worth in combat before attempting to
            cross this threshold.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center py-3 px-6 rounded-lg
                     bg-red-900 hover:bg-red-800 text-gray-100
                     transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-red-500/20
                     text-lg font-bold font-serif
                     border-2 border-red-600/50
                     group"
          >
            <Shield className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Retreat to Safe Ground
          </button>

          <p className="text-sm text-gray-400/80 italic">
            If you believe this barrier was raised in error, petition the High
            Commander or seek aid from the Brotherhood of Steel
          </p>
        </div>

        {/* Decorative metal corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-600/50" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-600/50" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-600/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-600/50" />
      </div>
    </div>
  )
}

export default LockedPage
