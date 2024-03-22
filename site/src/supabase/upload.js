import { supabase, urlupload } from './connection'


export async function upload(name, file, bucket) {
        try {
            // Upload da imagem para o Supabase Storage
            console.log(file);
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(`${name}-${Date.now()}`, file[0]);
           return urlupload + bucket + '/' + data.path

           
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error.message);
        }
  }

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