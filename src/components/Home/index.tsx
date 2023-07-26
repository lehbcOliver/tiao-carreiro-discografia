import { ChangeEvent, useEffect, useState } from 'react';
import { Footer } from '../Footer';
import styles from './Home.module.css';
import { IAlbum } from '../../interfaces';
import { api } from '../../services/api';
import { ConvertInMinutes } from '../../utils/Convert';

export function Home() {

  const [result, setResult] = useState<IAlbum[]>([]);
  const [search, setSearch] = useState('');

  async function SearchAlgum(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    getAlbuns();
  }

  async function getAlbuns() {
    const getData = await api.get('/album');
    const data = getData.data.data;
    const dataSearch = await data.filter((item: IAlbum) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    setResult(dataSearch)
  }
  useEffect(() => {
    getAlbuns()
  }, [result])

  return (
    <div className={styles.home}>
      <div className={styles.homeContent}>
        <div className={styles.search}>
          <label htmlFor="search">Digite uma palavra chave</label>
          <div>
            <input type="text" placeholder="Digite o nome do álbum" name="search" onChange={SearchAlgum} value={search} />
            <button onClick={getAlbuns}>Procurar</button>
          </div>
        </div>
        {result.map((data) => {
          return (
            <div className={styles.title} key={data.id}>
              <p>Álbum: {data.name}, {data.year}</p>
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Faixa</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tracks.map(track => {
                    const duration = ConvertInMinutes(track.duration)
                    return (
                      <tr key={track.id}>
                        <td>{track.number}</td>
                        <td>{track.title}</td>
                        <td>{duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
      <div className={styles.footer}>
        <Footer title='Álbum' link='/Album' icon='PlusCircle' />
      </div>

    </div>
  );
}