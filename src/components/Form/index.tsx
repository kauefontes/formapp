import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const defaultSchema = yup.object({
  name: yup.string().required("Inform a valid name"),
  email: yup.string().email("Inform a valid Email").required("Inform an Email"),
  password: yup.string().min(6, "Your password should have at least 6 characters").required("Inform a password"),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "Passwords doesn't match")
})

export function Form() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(defaultSchema)
  })

  function handleUserRegister(data: FormData) {
    console.log(data)
  }

  return (
    <Container>
      <ControlledInput
        name='name'
        control={control}
        icon="user"
        placeholder="Name"
        error={errors.name}
      />
      <ControlledInput
        name='email'
        control={control}
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.email}
      />
      <ControlledInput
        name='password'
        control={control}
        icon="lock"
        placeholder="Password"
        secureTextEntry
        error={errors.password}
      />
      <ControlledInput
        name='password_onfirm'
        control={control}
        icon="lock"
        placeholder="Password confirm"
        secureTextEntry
        error={errors.passwordConfirm}
      />

      <Button
        title="Sign up"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}