import React from 'react'
import { Shield, Sword, Crown } from 'lucide-react'

const MedievalLockedPage = () => {
  return (
    <div className="min-h-screen bg-stone-800 flex flex-col justify-center items-center p-4 bg-[url('/api/placeholder/800/600')] bg-cover bg-center">
      <div className="max-w-xl w-full space-y-8 text-center bg-stone-200/95 p-8 rounded-none border-8 border-double border-amber-900 shadow-2xl relative overflow-hidden">
        {/* Gothic arch top */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-stone-800 rounded-full" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-stone-200 rounded-full" />

        <div className="flex flex-col items-center relative mt-6">
          {/* Crown and shield */}
          <div className="flex flex-col items-center">
            <Crown className="h-12 w-12 text-amber-700" />
            <Shield className="h-16 w-16 text-amber-900 mt-2" />
          </div>

          <h2
            className="mt-4 text-3xl font-bold text-amber-900 font-serif"
            style={{ fontFamily: "'Luminari', fantasy" }}
          >
            Royal Proclamation
          </h2>

          <div className="flex items-center mt-4 space-x-4">
            <Sword className="h-6 w-6 text-amber-800 rotate-45" />
            <span className="text-xl text-amber-800 font-serif">†</span>
            <Sword className="h-6 w-6 text-amber-800 -rotate-45" />
          </div>
        </div>

        <div className="mt-6 px-4">
          <p className="text-lg text-amber-900 font-medium font-serif">
            Hear ye, hear ye!
          </p>
          <p className="mt-2 text-amber-800 font-serif">
            By decree of His Majesty, this chamber is forbidden to those lacking
            proper station or warrant. None may pass without the King's seal or
            permission of the Royal Steward.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center py-3 px-6
                     bg-amber-900 hover:bg-amber-800 text-stone-200
                     transition-all duration-200
                     shadow-lg text-lg font-bold font-serif
                     border-2 border-amber-700"
          >
            Return to the Great Hall
          </button>

          <p className="text-sm text-amber-800 italic font-serif">
            Should ye believe this to be in error, petition the Lord Chamberlain
            or seek audience with the Court Wizard
          </p>
        </div>
      </div>
    </div>
  )
}

export default MedievalLockedPage
