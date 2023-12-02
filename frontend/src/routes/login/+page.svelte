<script lang="ts">
	import logo from '$lib/assets/login.png';
	import { createForm } from "svelte-forms-lib";
	import * as yup from 'yup';
	import Icon from '@iconify/svelte';
	import AuthModel from "../../store/models/Auth.model";
	import { goto } from "$app/navigation";
	import {enhance} from '$app/forms';
	import { onMount } from 'svelte';
	import { authStore } from '../../store/index.store';

	const { form, errors, touched, isSubmitting, isValid, handleChange, validateField } = createForm({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: yup.object().shape({
			email: yup.string().required().email().label("Email address"),
			password: yup.string().required().label("Password")
		}),
		onSubmit:async (values) => {
			try {
				await new AuthModel().login(values)
			}catch (error){
				alert(error)
			}
			await goto('/chatroom')
	}
	});
	const handleBlur = (event: FocusEvent)=>{
		const field: "email"|"password" = event?.target?.name
		if (field != null) validateField(field);
	}
	onMount(()=>{
    	authStore.update((prevState:any)=>(prevState = {} as any))
  })
</script>

<div class="card flex-col justify-center items-center p-10 m-20 space-y-10">
	<div class="text-center">
		<h1 class="h1">Login</h1>
	</div>
	<div class="container flex space-x-10">
		<div class="hidden md:block w-2/3">
			<img src={logo} alt="login logo"/>
		</div>
		<div class="flex w-full md:w-1/3">
					<form use:enhance class="container flex-col items-center space-y-10" method="post">
						<label class="label">
						<span class="flex items-center"><Icon icon="streamline:send-email" class="mr-3" /> Email:</span>
						<input class="input" type="email"
									 on:change={handleChange}
									 on:blur={handleBlur}
									 bind:value={$form.email}
									 placeholder="Email..."
									 name="email"
						/>
						{#if $errors.email} <small class="text-red-500 text-md">{$errors.email}</small>{/if}
						</label>
						<label class="label">
						<span class="flex items-center"><Icon icon="teenyicons:password-outline" class="mr-3"/> Password:</span>
						<input class="input" type="password" name="password" on:change={handleChange}
								 on:blur={handleBlur}
								 bind:value={$form.password}
								 placeholder="Password..." />
							{#if $errors.password && $touched.password} <small class="text-red-500 text-md">{$errors.password}</small>{/if}
						</label>
						<button type="submit" class="variant-filled-error btn btn-lg w-full" disabled={!$isValid}>
							{#if $isSubmitting.valueOf()}<Icon icon="eos-icons:bubble-loading" />{:else}submit{/if}
						</button>
						<hr/>
					<div class="flex justify-center space-x-5 items-center">
						<p>Don't have an account yet!</p>
						<a href="/register" class="cursor"><Icon icon="arcticons:simplelogin" height="32"/></a>
					</div>
				</form>
		</div>
	</div>
</div>


<style lang="scss" itemscope>
	div.card {
		@apply bg-gray-900;
	}
</style>