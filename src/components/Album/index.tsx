import { PlusCircle } from 'phosphor-react';
import { Footer } from '../Footer';
import styles from './Album.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { IAlbum } from '../../interfaces';
import { api } from '../../services/api';
import { ConvertInDecimal, ConvertInMinutes } from '../../utils/Convert';


export function Album() {

  const [result, setResult] = useState<IAlbum[]>([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState(1900);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('00:00');
  const [open, setOpen] = useState(0);

  function OpenModal(id: number) {
    setOpen(id);
    setShow(!show)
  }

  const getAlbuns = async () => {
    const getData = await api.get('/album');
    const data = getData.data.data;
    setResult(data);
  }

  async function handleSubmitAlbum(event: FormEvent) {
    event.preventDefault();
    await api.post('/album', {
      name,
      year
    });
    setName('');
    setYear(1900);
    getAlbuns();

  }
  async function handleSubmitTracks(id: number) {
    event?.preventDefault();
    await api.post('/track', {
      album_id: id,
      number,
      title,
      duration: ConvertInDecimal(duration)
    });


    setNumber(0);
    setTitle('')
    setDuration('');
    setShow(false);
    getAlbuns()
  }
  async function handleDeleteAlbum(id: number) {
    await api.delete(`/album/${id}`);
    getAlbuns()
  }
  async function handleDeleteTrack(id: number) {
    await api.delete(`/track/${id}`);
    getAlbuns();
  }

  useEffect(() => {
    getAlbuns();
  }, [])

  return (
    <div className={styles.album}>
      <div className={styles.albumContent}>
        <form onSubmit={handleSubmitAlbum} className={styles.add}>
          <input type="text" placeholder="Novo álbum" onChange={(e) => setName(e.target.value)} value={name} />
          <input type="number" placeholder="Ano do álbum" onChange={(e) => setYear(Number(e.target.value))} value={year} />
          <button>Adicionar</button>
        </form>

        {result.map(data => {
          return (
            <div key={data.id}>
              <div className={styles.title}>
                <p>Álbum: {data.name},{data.year} </p>
                <div>
                  <button onClick={() => handleDeleteAlbum(data.id)}>Deletar álbum</button>
                  <button onClick={() => OpenModal(data.id)}>
                    <PlusCircle size={20} />
                    Faixa
                  </button>
                </div>
              </div>
              {data.id === open ?
                <form onSubmit={() => handleSubmitTracks(data.id)} className={show ? styles.trackOpen : styles.trackClose}>
                  <input type="number" placeholder='Numero' required onChange={(e) => setNumber(Number(e.target.value))} value={number} />
                  <input type="text" placeholder='Nome da faixa' required onChange={(e) => setTitle(e.target.value)} value={title} />
                  <input type="time" placeholder='Duração' required onChange={(e) => setDuration(e.target.value)} value={duration} />
                  <button>Adicionar</button>
                </form>
                : <div></div>}
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Faixa</th>
                    <th>Duração</th>
                    <th></th>
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
                        <td><button onClick={() => handleDeleteTrack(track.id)}>Deletar</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
      <div className={styles.footer}>
        <Footer title='voltar' link='/' icon='ArrowArcLeft' />
      </div>
    </div>


  );
}