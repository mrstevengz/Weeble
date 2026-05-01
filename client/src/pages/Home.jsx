import InputCharacter from "../components/InputCharacter.jsx";
import NavBar from "../components/NavBar.jsx";

function Home({ characters }) {
  return <div className ="content">
    <NavBar/>
    <InputCharacter characters={characters} />
    </div>
}

export default Home;

