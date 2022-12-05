import React from "react"
import Head from 'next/head'

import UserList from '../components/userlist'


export default function Home(props) {
  return (
    <>
      {props.ssrWorking ? (
        <div>
          <UserList />
        </div>
      ) : (
        <h2>SSR not working</h2>
      )}
    </>    
  );
}

export async function getServerSideProps() {
  return { props: { ssrWorking: true } };
}