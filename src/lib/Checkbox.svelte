<script lang="ts">
  export let checked: boolean;
  export let name: string;
</script>

<label for={name} class="flex gap-2">
  <input type="checkbox" {name} id={name} bind:checked />
  <slot />
</label>
