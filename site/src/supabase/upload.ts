import { supabase, urlupload } from './connection'


// export async function upload(name: string, file) {
//         try {
//             // Upload da imagem para o Supabase Storage
//             const { data, error } = await supabase.storage
//                 .from('images')
//                 .upload(`image-${Date.now()}`, file);

//             if (error) {
//                 throw error;
//             }

//             // Se o upload for bem-sucedido, obtenha o URL da imagem
//             const imageURL = data.url;

//             // Atualize o estado com o URL da imagem
//             setImageURL(imageURL);

//             // Adicione a imagem ao editor (caso queira)
//             const quill = quillRef.current.getEditor();
//             const range = quill.getSelection(true);
//             quill.insertEmbed(range.index, 'image', imageURL);
//         } catch (error) {
//             console.error('Erro ao fazer upload da imagem:', error.message);
//         }
//   }

// export async function uploadIcone(name:string, file:any){
//     console.log(name);
//     console.log(file);
//     try{
//         if(file.uri !== null){
//             const numeroAle = Math.random()
//             const nameNew =  name + numeroAle +"." + file.uri.split('.')[3]
//             const { data, error } = await supabase
//             .storage
//             .from('icone')
//             .upload(nameNew, file)
    
//             return "https://cbrqdjaeurmeftioqfaz.supabase.co/storage/v1/object/public/icone/" + nameNew
//         }
//     }catch(err){
//         return err
//     }

            
// }