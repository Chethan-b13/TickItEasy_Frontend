import * as yup from 'yup'



export const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Email is a required!"),
    password: yup.string().required("Password is required!"),
  })
                  
export const SignupSchema = yup.object().shape({
    email: yup.string().email().required("Email is a required!"),
    password1: yup.string().min(8,"Password must be greater than 8 characters!").max(12).required("Password is required!"),
    password2: yup.string().oneOf([yup.ref('password1'),null],"Password did not match!").required("Confirm Your Password!"),
})

export const CreateEventSchema = yup.object().shape({
    title: yup.string().required("Event Must have a title"),
    image: yup
    .mixed()
    .required('Events with poster will have high audience intrest!')
    .test( "file", "You forgot Event Poster!",
      (value) => value && value.length === 1 && value[0] instanceof File )
    ,
    price: yup
        .number('Price should be an integer')
        .required('Price is required')  
        .min(1, 'Price cannot be negative')
        .max(100000, 'Price should not exceed 100000'),
    description: yup.string().required('Description is required'),
    number_of_seats: yup.number().required('Number of seats is required').integer('Number of seats should be an integer').min(20,"Event Should have atleast 20 Seats"),
    mode: yup.string().required('Mode is required'),
    venue: yup.string().required('Venue is required'),
    genre: yup.string().required('Genre is required'),
    start_time: yup.date().required("Please Specify the Event Start Date & Time"),
    end_time: yup.date().required("Please Specify the Event End Date & Time")
});

