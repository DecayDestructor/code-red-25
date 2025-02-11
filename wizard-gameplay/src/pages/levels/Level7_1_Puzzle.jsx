import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const Level7_1 = () => {
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const dummyDivRef = useRef(null);
  const [foundPassword, setFoundPassword] = useState(false);
  const [isSudo , setIsSudo] = useState(false)
  const [defeatedMalevoryx , setDefeatedMalevoryx] = useState(false)
  const [blurPx, setBlurPx] = useState(3);
  const [finalCommand, setFinalCommand] = useState("Find me out");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const navigate = useNavigate();

  const HOSTNAME = `eryndor@kravaros-arcane-forge:~$`;
  const HOSTNAME_HTML = `<span style="margin-left:1rem; font-weight:bold; color:oklch(.508 .118 165.612);">${HOSTNAME}</span>`;
  // var BLUR_PX = 3;
  // var FINAL_COMMAND = `Find me out`

  const script = "U2VhbGluZyBzcGVsbDpTb21ldGhpbmcgbG9zdCBpcyBzb21ldGhpbmcgZ2FpbmVkLiAKClNlZSB0aGUgZGV2ZWxvcGVyIHRvb2xzLg=="; //Something lost is something gained
  window.spell = script;

  const generateRandomCommand = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: 8 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  };

  const fileInfo = [
    {
      name: "spellbook.txt",
      content: Array.from({ length: 7 }, () => `Try command ${generateRandomCommand()}<br>`).join("\n"),
    },
    {
      name: "notes.log",
      content: Array.from({ length: 6 }, () => `Try command ${generateRandomCommand()}<br>`).join("\n"),
    },
    {
      name: "secret_codes.txt",
      content: Array.from({ length: 8 }, () => `Try command ${generateRandomCommand()}<br>`).join("\n"),
    },
    {
      name: "instructions.md",
      content: Array.from({ length: 7 }, () => `Try command ${generateRandomCommand()}<br>`).join("\n"),
    },
    {
      name: "ancient_script.dat",
      content: Array.from({ length: 6 }, () => `Try command ${generateRandomCommand()}<br>`).join("\n"),
    },
  ];

  const commands = [
    {
      name: "sudo",
      textIfPasswordNotAdded: `<br> <span style="margin-left:1rem;">To enter sudo mode, you have to first crack the sealing spell. </span> <br>`,
      textIfPasswordAdded: `<br> <span style="margin-left:1rem;">Successfully entered sudo mode. See <span style="font-style:italic">help</span></span><br>`,
    },
    {
      name: "help",
      textIfPasswordNotAdded: `<br><span style="margin-left:1rem;">Permission denied. </span> <br>`,
      textIfPasswordAddedAndNotSudo: `<br><span style="margin-left:1rem;">Secret key entered but permission denied. </span><br>`,
      textIfPasswordAddedAndSudo: `<br><span style="margin-left:1rem;">Here's a list of available commands<br> ls<br> pwd<br>cat [filename]<br> <span style="filter:blur(${blurPx}px);">${finalCommand}</span></span>`,
    },
    {
        name: "Something lost is something gained",
        text : `<br> <span style="margin-left:1rem;">Congrats. Some permissions granted.</span> <br>`
    },
    {
        name : "pwd",
        textIfPasswordNotAddedAndNotSudo : `<br><span style="margin-left:1rem;">Permission denied. </span> <br>`,
        textIfPasswordAddedAndSudo : `<br><span style="margin-left:1rem;"> / </span>`
    },
    {
      name : "ls",
      textIfPasswordNotAddedAndNotSudo : `<br><span style="margin-left:1rem;">Permission denied. </span> <br>`,
      textIfPasswordAddedAndSudo : `<br>${fileInfo.map(file => file.name + "<br>")}`
    },
    {
      name: "cat",
      textIfPasswordNotAddedAndNotSudo : `<br><span style="margin-left:1rem;">Permission denied. </span> <br>`
    },
    {
      name : "set death",
      textIfPasswordNotAddedAndNotSudo : `<br><span style="margin-left:1rem;">Invalid command. </span> <br>`
    },
    {
      name : "next level",
      textIfPasswordNotAddedAndNotSudoAndNotDefeatedMaleVoryx : `<br><span style="margin-left:1rem;">Invalid command. </span> <br>`,
      
    }
  ];

  

  const commandEntered = (event) => {
    if (event.key === "Enter") {
        //Enter is pressed after a command is typed
        // console.log(textRef.current.value);
        let command = textRef.current.value;
        command = command.trim();
        setCommandHistory((prev) => [...prev, command]);
        setHistoryIndex(-1);
        
        contentRef.current.innerHTML += `<br>${HOSTNAME_HTML} ${textRef.current.value} `;
        textRef.current.value = "";

        //Find if entered text is a command
        var command_split = command.split(" ");
        var command_names = commands.map((command) => command.name);
        const fileNames = fileInfo.map(file => file.name);
        if(command === commands[2].name){
            contentRef.current.innerHTML += commands[2].text
            setFoundPassword(true)
        } else if(command_split[0] === command_names[0]){ //If first word is sudo
            // console.log(foundPassword ? commands[0].textIfPasswordAdded : commands[0].textIfPasswordNotAdded);
            contentRef.current.innerHTML += foundPassword ? commands[0].textIfPasswordAdded : commands[0].textIfPasswordNotAdded; 
            if(foundPassword){
                setIsSudo(true);
            }
        } else if(command === command_names[1]){
            // console.log(foundPassword ? (isSudo ? commands[1].textIfPasswordAddedAndSudo : commands[1].textIfPasswordAddedAndNotSudo) : commands[1].textIfPasswordNotAdded );
            contentRef.current.innerHTML += foundPassword ? (isSudo ? commands[1].textIfPasswordAddedAndSudo : commands[1].textIfPasswordAddedAndNotSudo) : commands[1].textIfPasswordNotAdded ;
        }else if(command === command_names[3]){
            if(!isSudo || !foundPassword){
              contentRef.current.innerHTML += commands[3].textIfPasswordNotAddedAndNotSudo;
            } else {
              contentRef.current.innerHTML += commands[3].textIfPasswordAddedAndSudo;
            }
        } else if(command === command_names[4]){
          if(!isSudo || !foundPassword){
            contentRef.current.innerHTML += commands[4].textIfPasswordNotAddedAndNotSudo;
          } else {
            contentRef.current.innerHTML += commands[4].textIfPasswordAddedAndSudo;
          }
        } else if(command_split[0] === command_names[5]){
          if(!isSudo || !foundPassword){
            contentRef.current.innerHTML += commands[5].textIfPasswordNotAddedAndNotSudo;
          } else {
            if(fileNames.includes(command_split[1])){
              const content = fileInfo.filter(file => {
                if(file.name === command_split[1]){
                  return file.content;
                }
              })[0].content;
              // console.log(content);
              
              contentRef.current.innerHTML += `<br> ${content}`
            } else {
              contentRef.current.innerHTML += `<br> Invalid file name <br>`
            }
          }
        } else if(command.startsWith(command_names[6])){
          if(!isSudo || !foundPassword || blurPx != 0 || finalCommand !== "set death --[NAME]"){
            contentRef.current.innerHTML += commands[6].textIfPasswordNotAddedAndNotSudo;
          } else {
            const name= command_split[2]
            if(name === "--Malevoryx" || name === "--MALEVORYX" || name === "--malevoryx"){
              contentRef.current.innerHTML += `<br> Congrats! You have defeated the evil mage Malevoryx. <br>
                You may now proceed to the next level. Simply type "next level" as a command to do so!!!<br>`
              setDefeatedMalevoryx(true)
              }
          }
        } else if(command === command_names[7]){
          if(!isSudo || !foundPassword || !defeatedMalevoryx){
            contentRef.current.innerHTML += commands[7].textIfPasswordNotAddedAndNotSudoAndNotDefeatedMaleVoryx;
          } else {

            
            // setTimeout(() => {
              //navigate("/levels/Level7_2pre");
            // }, 1000);



          }
        }else {
            contentRef.current.innerHTML += `<br> <span style="margin-left:1rem;"> Invalid command </span> <br>`
        } 
    } else if (event.key === "ArrowUp") {
      console.log(commandHistory , historyIndex);
      
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        textRef.current.value = commandHistory[newIndex];
      }
    } else if (event.key === "ArrowDown") {
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        textRef.current.value = newIndex === -1 ? "" : commandHistory[newIndex];
      }
    }
  };

  useEffect(() =>{
    const checkElement = () => {
      if (dummyDivRef.current && !document.body.contains(dummyDivRef.current)) {
        // BLUR_PX = 0;
        // FINAL_COMMAND = `set death --[NAME]`
        setBlurPx(0)
        setFinalCommand(`set death --[NAME]`)
        commands[1].textIfPasswordAddedAndSudo = `<br><span style="margin-left:1rem;">Here's a list of available commands<br> ls<br> pwd<br> <span style="filter:blur(${blurPx}px);">${finalCommand}</span></span>`  
        // console.log(commands[1].textIfPasswordAddedAndSudo);
        
      }
    };

    const interval = setInterval(checkElement, 2000); // Check every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  } , [])

  return (
    <>
      <div className="w-screen h-screen bg-stone-950 overflow-x-hidden">
        <div ref={dummyDivRef} id="something-lost-is-something-gained" className="hidden"></div>
        <div
          ref={contentRef}
          className="pt-16 terminal_content text-slate-300 font-semibold ml-1"
        ></div>
        <span className="ml-4 font-bold text-emerald-700">{HOSTNAME}</span>
        <input
          className="min-w-96 ml-1.5 caret-blue-300 text-slate-300 font-semibold focus:outline-hidden"
          ref={textRef}
          name="commands"
          id="curr_command"
          defaultValue={""}
          onKeyDown={commandEntered}
        ></input>
      </div>
    </>
  );
};

export default Level7_1;
