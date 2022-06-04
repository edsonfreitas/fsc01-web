import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


//Componente Input
 const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"/>
 )

    const validationSchema = yup.object({
        email: yup.string().required('Digite seu email').email('E-mail inválido'),
        password: yup.string().required('Digite sua senha')
    })
//Tela Login
export function Login ({ signInUser }){
    const formik = useFormik({
        onSubmit: async values => {
          const res = await  axios.get('http://localhost:9901/login', {
                auth: {
                    username: values.email,
                    password: values.password
                }
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
            <div className='h-full flex justify-center'>
                <div className='bg-birdBlue lg:flex-1'></div>
                <div className='flex-1 flex items-center justify-center p-12 space-y-6'>
                <div className="max-w-md flex-1">
                    <h1 className="text-3xl">Acesse sua conta</h1>

                    <form className="space-y-6 " onSubmit={formik.handleSubmit}>
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
                        </div>
                        {/*<---*/}
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
                        )}{/*<---*/}
                    </div>
                    <button
                    type='submit'
                    disabled={formik.isSubmitting || !formik.isValid}
                    className='w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg'
                    >
                    {formik.isSubmitting ? "Enviando..." : "Entrar"}</button>
                    </form>
                    <span className="text-sm text-silver text-center">Não tem conta? <a className="text-birdBlue" href='/signup'>Inscreva-se</a>
                    </span>
                </div>
            </div>
        </div> 
    )
}