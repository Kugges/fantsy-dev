
import React from 'react'


const styles = {
  skellCard: "rounded-xl border-white border-8 shadow-lg bg-white overflow-hidden animate-pulse",
  skellText: "bg-shade-100 rounded-lg w-1/2 h-6"
}


const UserCardSkell = () => {

  return (
    <div className={styles.skellCard}>

      <div className="bg-shade-100 aspect-square">

      </div>
      <div>
        <p className="pt-2"></p>
        <div className=" flex flex-col gap-1">

        <div className={styles.skellText}></div>

        <div className="bg-shade-100 rounded-lg w-1/3 h-6"></div>
        </div>
      </div>
    </div>

  )
}

export default UserCardSkell;