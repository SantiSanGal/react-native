import { StyleSheet, Text, View } from 'react-native';
import { genesysApi } from '../../api/genesysApi';
import './css/loginpage.css'

export const LoginPage = ({navigation}:any) => {

    const handleSubmit = (e:any) => {
        e.preventDefault();

        let data = {
            username: "edufer95@outlook.es",
            password: "123"
        }
        genesysApi.post('/auth/login', data)
        .then(res => {
            localStorage.setItem('token', res.data.data.accessToken)
        })
        .catch(err => console.log(err));

        let dataChat = {
            participanteNombre: "Santiago Galvan",
            participanteId: "58621",
            participanteAvatar: "https://media.licdn.com/dms/image/C4D03AQF2y8lUEfzQkw/profile-displayphoto-shrink_800_800/0/1607906665142?e=2147483647&v=beta&t=wyfxNxIy_hRicdF0J9s22lQqeRdvfF5B6bZC1KWg3CU",
            mensaje: "Hola Desde React Native"
        }

        // genesysApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        genesysApi
        .post('/chats', dataChat)
            .then(res => {
                if (res.data.data.chat.chatId) {
                    localStorage.setItem('chatId', res.data.data.chat.chatId)
                    navigation.navigate('chat');
                }
            })
            .catch(err => console.log('Error al crear Chat -> ',err))
    }

  return (
    <View style={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
                <label htmlFor="user" className="form-label">Usuario</label>
                <input 
                    type="text"
                    id="user" 
                    className="form-control"
                />
            </div>
            <div className="form-outline mb-4">
                <label htmlFor="password" className="form-label" >Password</label>
                <input 
                    type="password" 
                    id="form2Example2" 
                    className="form-control" 
                />
            </div>
            <div className="row mb-4">
                <button className="btn btn-primary btn-block mb-4">Ingresar</button>
            </div>
        </form>
        <div className="contLogoMin animar">
            <img src="/assets/img/LogoQboxMin.png" alt="" />
        </div>
        {/* <LottieView
            autoPlay
            // ref={animation}
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('/assets/Qbox.json')}
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'linear-gradient(143deg, rgba(0,1,41,1) 0%, rgb(11, 51, 74) 68%, rgba(44,197,171,0.5323275862068966) 88%, rgba(50,224,190,0.6961206896551724) 99%)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  