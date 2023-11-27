<script lang="ts">
	import logo from '$lib/assets/login.png';
	import { createForm } from "svelte-forms-lib";
	import * as yup from 'yup';
	import Icon from '@iconify/svelte';
	import {enhance} from '$app/forms';
	import { authStore } from "../../store/index.store";

	export let data;

	$:clearUser = data?.clearUser;

	$:{
		if (clearUser) authStore.set(undefined)
	}

	const { form, errors, touched, isSubmitting, isValid, handleChange, handleSubmit, validateField } = createForm({
		initialValues: {
			firstname:"",
			lastname:"",
			email: "",
			password: "",
			confirmPassword: ""
		},
		validationSchema: yup.object().shape({
			firstname: yup.string().required().min(2).max(30),
			lastname: yup.string().required().min(2).max(50),
			email: yup.string().required().email().label("Email address"),
			password: yup.string().required().min(8).label("Password").max(25),
			confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
		}),
		onSubmit:async () => {

		}
	});
	const handleBlur = (event: FocusEvent)=>{
		const field: "firstname"|"lastname"|"email"|"password"|"confirmPassword" = event?.target?.name
		if (field != null) validateField(field);
	}
</script>

<div class="card flex-col justify-center items-center p-10 m-20 space-y-10">
	<div class="text-center">
		<h1 class="h1">Register</h1>
	</div>
	<div class="container flex space-x-10 items-center">
		<div class="hidden md:block w-1/3">
			<img src={logo} alt="login logo"/>
		</div>
		<div class="flex w-full md:w-2/3">
			<form use:enhance class="container flex-col items-center space-y-10" method="post">
				<div class="flex space-x-10">
					<label class="label w-1/2">
						<span class="flex items-center"><Icon icon="ph:user-thin"  class="mr-3" /> Firstname:</span>
						<input class="input" type="text"
									 on:change={handleChange}
									 on:blur={handleBlur}
									 bind:value={$form.firstname}
									 placeholder="Firstname..."
									 name="firstname"
						/>
						{#if $errors.firstname} <small class="text-red-500 text-md">{$errors.firstname}</small>{/if}
					</label>
					<label class="label w-1/2">
						<span class="flex items-center"><Icon icon="ph:user-thin"  class="mr-3"/> Lastname:</span>
						<input class="input" type="text" name="lastname" on:change={handleChange}
									 on:blur={handleBlur}
									 bind:value={$form.lastname}
									 placeholder="Lastname..." />
						{#if $errors.lastname && $touched.lastname} <small class="text-red-500 text-md">{$errors.lastname}</small>{/if}
					</label>
				</div>
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
				<div class="flex space-x-10">
					<label class="label w-1/2">
						<span class="flex items-center"><Icon icon="teenyicons:password-outline" class="mr-3"/> Password:</span>
						<input class="input" type="password"
									 on:change={handleChange}
									 on:blur={handleBlur}
									 bind:value={$form.password}
									 placeholder="Password..."
									 name="password"
						/>
						{#if $errors.password} <small class="text-red-500 text-md">{$errors.password}</small>{/if}
					</label>
					<label class="label w-1/2">
						<span class="flex items-center"><Icon icon="teenyicons:password-outline" class="mr-3"/>Confirm password:</span>
						<input class="input" type="password" name="confirmPassword" on:change={handleChange}
									 on:blur={handleBlur}
									 bind:value={$form.confirmPassword}
									 placeholder="Confirm Password..." />
						{#if $errors.confirmPassword && $touched.confirmPassword} <small class="text-red-500 text-md">{$errors.confirmPassword}</small>{/if}
					</label>
				</div>
				<button type="submit" class="variant-filled-error btn btn-lg w-full" disabled={!$isValid}>
					{#if $isSubmitting.valueOf()}<Icon icon="eos-icons:bubble-loading" />{:else}submit{/if}
				</button>
				<hr/>
				<div class="flex space-x-5 items-center justify-center w-full">
					<p>Already have an account!</p>
					<a href="/login" class="cursor"><Icon icon="arcticons:sqrllogin" height="32"/></a>
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