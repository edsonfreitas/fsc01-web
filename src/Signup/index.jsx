import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


//Componente Input
 const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"/>
 )

    const validationSchema = yup.object({
        name: yup.string().required('Digite seu nome'),
        username: yup.string().required('Digite um nome de usuário'),
        email: yup.string().required('Digite seu email').email('E-mail inválido'),
        password: yup.string().required('Digite sua senha')
    })
//Tela Login
export function Signup ({ signInUser }){
    const formik = useFormik({
        onSubmit: async values => {
          const res = await  axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
              name: values.name,
              email: values.email,
              username: values.username, 
              password: values.password
            })

            signInUser(res.data)
        },
            initialValues: {
                email: '',
                password: ''
            },
            validateOnMount: true,
            validationSchema,
    })
    return(
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
            <h1 className="text-4xl">Crie sua conta</h1>

            <form className="space-y-6 " onSubmit={formik.handleSubmit}>
                
                {/*name-->*/}
                <div className='space-y-2'>
                    <Input 
                    type="text"
                    name='name'
                    placeholder="Nome"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBluer={formik.handleBlur}
                    disabled={formik.isSubmitting}
                />
                {/*Error no name -->*/}
                {(formik.touched.name 
                    && formik.errors.name) 
                    && <div className='text-red-500 text-sm'>{formik.errors.name}</div>
                }
                </div>{/*<--name*/}  

                {/*username-->*/}
                <div className='space-y-2'>
                    <Input 
                    type="text"
                    name='username'
                    placeholder="Nome do usuário"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBluer={formik.handleBlur}
                    disabled={formik.isSubmitting}
                />
                {/*Error no username -->*/}
                {(formik.touched.username 
                    && formik.errors.username) 
                    && <div className='text-red-500 text-sm'>{formik.errors.username}</div>
                }
                </div>{/*<-- username*/} 

                {/*email-->*/}
                <div className='space-y-2'>
                    <Input 
                    type="text"
                    name='email'
                    placeholder="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBluer={formik.handleBlur}
                    disabled={formik.isSubmitting}
                />
                {/*Error no email -->*/}
                {(formik.touched.email 
                    && formik.errors.email) 
                    && <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                     }
                </div>{/*<---email*/} 

               {/*password-->*/} 
            <div className='space-y-2'>
                <Input 
                    type="password"
                    name='password' 
                    placeholder="Senha"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBluer={formik.handleBlur}
                    disabled={formik.isSubmitting}
                />
                {/*Error no password -->*/}
            {(formik.touched.password
                && formik.errors.password)
                && (<div className='text-red-500 text-sm'>{formik.errors.password}</div>
                )}
            </div>{/*<--password*/}

             <button
             type='submit'
             disabled={formik.isSubmitting || !formik.isValid}
             className='w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg'
             >
            {formik.isSubmitting ? "Enviando..." : "Cadastrar"}</button>
            </form>
            <span className="text-sm text-silver text-center">Já tem uma conta? <a className="text-birdBlue" href='/login'>Acesse</a>
            </span>
        </div>
    )
}