import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type = "greeting"
            title = "Welcome"
            user = {loggedIn?.name || 'Guest'}
            subtext = "Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {3895.689 }
          />

        </header>

        Recent Transaction 

      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 25603.05}, {currentBalance: 35987.652}]}
      />

    </section>
    
  )
}

export default Home