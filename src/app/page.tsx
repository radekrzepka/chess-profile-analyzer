const Home = () => {
   return (
      <>
         <h1 className="mb-4 text-5xl">Welcome in lichess profile analyzer</h1>
         <div className="grid md:grid-cols-[3fr_2fr]">
            <div className="text-lg">
               <p className="mb-3">
                  Welcome to our chess analysis web app, where we bring the
                  power of data-driven insights to your lichess.org profile! Our
                  app provides a comprehensive suite of tools to help you
                  improve your chess game and gain a deeper understanding of
                  your playing style.
               </p>
               <ol className="list-inside list-decimal md:ml-5">
                  <li className="mb-3">
                     Analysis: With our sophisticated analysis page, you can
                     delve into the nuances of your chess performance. Simply
                     select the timestamp for analysis, and pick your preferred
                     game type, be it classic, rapid, blitz, bullet, or all of
                     them. You can even choose to focus on specific games by
                     filtering based on your username, the color of your pieces.
                     Once you submit the form, our app harnesses the lichess.org
                     API to generate a wealth of data about your games.
                  </li>
                  <li className="mb-3">
                     Discover Your Strengths and Weaknesses: Uncover the
                     openings where you excel and identify those that could use
                     some improvement. Our app provides insightful breakdowns of
                     your best and worst openings, offering you valuable
                     guidance to enhance your gameplay.
                  </li>
                  <li className="mb-3">
                     Openings: The openings page is a treasure trove of
                     knowledge for chess enthusiasts. Here, you can read about
                     various chess openings and, even more excitingly, see the
                     games you&apos;ve analyzed using those openings. Learn from
                     your own past games and explore different strategies
                     employed by other players to sharpen your tactical acumen.
                  </li>
                  <li className="mb-3">
                     Previous Analysis: Never lose track of your progress! Our
                     app keeps a record of all your previous analyses in local
                     storage, so you can easily revisit them whenever you like.
                     Review your historical performance and witness your growth
                     as a chess player.
                  </li>
               </ol>
               <p className="mb-3">
                  Whether you&apos;re a seasoned chess master or a budding
                  enthusiast, our chess analysis web app offers a wealth of
                  resources to help you level up your skills and enjoy the game
                  like never before. Join us today and embark on a journey of
                  continuous improvement in the world of chess!
               </p>
            </div>
            <div>{/* TODO: Add images of app when app ready */}</div>
         </div>
      </>
   );
};

export default Home;
