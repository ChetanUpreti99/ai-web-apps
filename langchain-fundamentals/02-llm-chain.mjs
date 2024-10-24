import { OpenAI } from "@langchain/openai";
import { ChatPromptTemplate,PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

const main = async ()=>{
   // 1. Prompt Template
    const promptTemplate = PromptTemplate.fromTemplate(
        "Tell me a joke about {topic}"
      );
      
      await promptTemplate.invoke({ topic: "cats" });
      
      const chatPromptTemplate = ChatPromptTemplate.fromMessages([
        [
          "system",
          "You are a helpful assistant that can tell jokes. Don't do anything else.",
        ],
        ["user", "Tell me a joke that includes both {topic1} and {topic2}"],
      ]);
       // This manual invoking is not needed if we use the LLMChain
      await chatPromptTemplate.invoke({ topic1: "cats", topic2: "dogs" });

       // 2. LLM Chain

    const model = new OpenAI({
        temperature:0.9 // Temperature decides the randomness of the output. less the
    })

    const llmChain = new LLMChain({
        prompt: promptTemplate,
        llm:model
    })

    const llmChainB = new LLMChain({
        prompt: chatPromptTemplate,
        llm: model,
      });

      const [res, resB] = await Promise.all([
        llmChain.invoke({
          topic: "dogs",
        }),
        llmChainB.invoke({
          topic1: "dogs",
          topic2: "tigers",
        }),
      ]);
    
      console.log({ res, resB });

    
}

main();
