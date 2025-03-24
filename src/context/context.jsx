import React, { createContext, useState, useCallback } from "react";
import { generateText } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");  // ✅ Fix: Initialize as an empty string
  const [prevprompt, setPrevPrompt] = useState([]);
  const [recentPrompt,setRecentPrompt]=useState("");
  const delayPara=(index,nextword)=>
  {
    setTimeout(()=>{
      setGeneratedText(prev=>prev+nextword)
    },75*index);

  }

  const onSent = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    

    try {
      const result = await generateText(prompt);
      // setGeneratedText(result);
      let resultarr=result.split("**");
      let newresultarr = "";
			for (let i = 0; i < resultarr.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newresultarr += resultarr[i];
				} else {
					newresultarr += "<b>" + resultarr[i] + "</b>";
				}
			}
      let newresultarr2=newresultarr.split("*").join("</br>")
      let newResultArray=newresultarr2.split(" ");
      for(let i=0;i<newResultArray.length;i++)
      {
        const nextword =newResultArray[i];
        delayPara(i,nextword+" ");
      }
      // setGeneratedText(newresultarr);

      // console.log("API Response:", result);
    } catch (err) {
      setError(err);
      setGeneratedText(null);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const callit = (input) => {
    onSent(input);
    setRecentPrompt(input);
    setPrevPrompt(prev=>[...prev,input])
  };

  const contextValue = {
    generatedText,
    loading,
    error,
    input,
    setInput,
    prevprompt,
    callit,
    recentPrompt,
    setRecentPrompt,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
