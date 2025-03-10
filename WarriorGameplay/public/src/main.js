import { k } from '/src/kaboomLoader.js'
import { room1 } from '/src/scenes/room1.js'
import { room2 } from '/src/scenes/room2.js'
import { setBackgroundColor } from '/src/scenes/roomUtils.js'
import { makeNotificationBox } from '/src/ui/notificationBox.js'
// import CryptoJS from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";

async function main() {
  const room1Data = await (await fetch('./maps/room1.json')).json()
  const room2Data = await (await fetch('./maps/room2.json')).json()

  k.scene('room1', (previousSceneData) => {
    room1(k, room1Data, previousSceneData)
  })
  k.scene('room2', (previousSceneData) => {
    room2(k, room2Data, previousSceneData)
  })

  k.scene('final-exit', () => {
    setBackgroundColor(k, '#20214a')
    k.add(makeNotificationBox(k, 'Press Enter to proceed.'))

    k.onKeyPress('enter', () => {
      // console.log("Unlocking level_6_1 and updating cookies...");
      window.location.href = './backstory_level_6_1'
    })
  })
}

k.scene('intro', () => {
  setBackgroundColor(k, '#20214a')
  k.add(
    makeNotificationBox(
      k,
      'Escape the factory!\nUse A, D to move, W to jump, Left Click to attack.\nPress Enter to start!'
    )
  )
  k.onKeyPress('enter', () => {
    const context = new AudioContext()
    context.resume()
    k.go('room1', { exitName: null })
  })
})

k.go('intro')

main()
