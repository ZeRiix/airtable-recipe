<script setup lang="ts">
interface Props {
	content: string;
	formKey: string;
	cols: number;
}

defineProps<Props>();

function maskPassword(password: string): string {
	if (!password) {
		return "";
	}
	return "•".repeat(password.length);
}
</script>

<template>
	<p
		:style="{
			'grid-column': `span ${cols} / span ${cols}`
		}"
		class="flex flex-col gap-2"
	>
		{{ maskPassword(content) }}
	</p>
</template>
