<script setup lang="ts">
const emit = defineEmits<{
	submit: [];
}>();

interface Props {
	align?: "auto" | "center" | "end";
	reverse?: boolean;
}

defineProps<Props>();

function submit(event: Event) {
	event.preventDefault();
	emit("submit");
}

defineSlots<{
	default(): never;
	formField(): never;
}>();
</script>

<template>
	<form
		@submit="submit"
		class="p-4 flex flex-col gap-2 bg-background border border-border rounded-lg"
		:class="{
			'flex-col-reverse': reverse
		}"
	>
		<slot name="formField" />

		<div
			class="flex"
			:class="{
				'justify-center': align === 'center',
				'justify-end': align === 'end',
			}"
		>
			<slot />
		</div>
	</form>
</template>
