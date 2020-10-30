import React,{useState,useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
    const [repositories,setRepositories] = useState([]);

    useEffect(() => {
      api.get('repositories').then(response => {
        console.log(response);
        setRepositories(response.data);
      });
    },[]);
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title : `New Repository ${Date.now()}`,
	    url : "github/repo1",
	    techs : ["tech 1" , "tech 2", "tech 3"]

    });

    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`).then(response => {
      console.log(`id deleted`);
    });

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex,1)
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.title}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
