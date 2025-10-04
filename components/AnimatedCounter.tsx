"use client"
import { formatAmount } from "@/lib/utils"
import CountUp from "react-countup"
 // adjust path if needed

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp 
        end={amount} 
        formattingFn={formatAmount}
        decimals={2} 
      />
    </div>
  )
}

export default AnimatedCounter
