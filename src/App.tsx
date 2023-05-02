import { Header } from './components/Header'

import './global.css';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';



const posts: PostType[]= [
  {
    id: 1,
    author:{
      avatarUrl: 'https://github.com/ArnaldoAF.png',
      name: 'Arnaldo Assis Ferreira',
      role: 'Front-end Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2023-04-19 20:00:00'),
    comments: [
      {
        id:1,
        author:{
          avatarUrl: 'https://github.com/ArnaldoAF.png',
          name: 'Arnaldo Assis Ferreira',
          role: 'Front-end Developer'
        },
        content: [
          { type: 'paragraph', content: 'Legal 👋' },
        ],
        publishedAt: new Date('2023-04-19 23:00:00'),
      },
      {
        id:2,
        author:{
          avatarUrl: 'https://github.com/ArnaldoAF.png',
          name: 'Arnaldo Assis Ferreira',
          role: 'Front-end Developer'
        },
        content: [
          { type: 'paragraph', content: 'Bacana 👋' },
        ],
        publishedAt: new Date('2023-04-19 22:00:00'),
      },
      {
        id:3,
        author:{
          avatarUrl: 'https://github.com/cardosogc.png',
          name: 'Guilherme Cardoso',
          role: 'Dev'
        },
        content: [
          { type: 'paragraph', content: 'Sensasional 👋' },
        ],
        publishedAt: new Date('2023-04-19 22:00:00'),
      }
    ]
  },
  {
    id: 2,
    author:{
      avatarUrl: 'https://github.com/cardosogc.png',
      name: 'Guilherme Cardoso',
      role: 'Dev'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' }
    ],
    publishedAt: new Date('2023-04-16 8:00:00'),
    comments: [
      
      {
        id:3,
        author:{
          avatarUrl: 'https://github.com/ArnaldoAF.png',
          name: 'Arnaldo Assis Ferreira',
          role: 'Front-end Developer'
        },
        content: [
          { type: 'paragraph', content: 'Bacana 👋' },
        ],
        publishedAt: new Date('2023-04-19 22:00:00'),
      }
    ]
  }
]

function App() {

  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post post={post} key={post.id}/>
          ))}
        </main>
      </div>
    </div>
  )
}

export default App
