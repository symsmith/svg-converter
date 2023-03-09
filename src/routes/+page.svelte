<script lang="ts">
  import { convertInput } from "$lib/utils";
  import Checkbox from "$lib/Checkbox.svelte";
  import Textarea from "$lib/Textarea.svelte";

  let input = "";
  let addCircledTag = false;

  $: output = convertInput(input, addCircledTag);
</script>

<div class="flex p-4 items-center justify-center">
  <Checkbox bind:checked={addCircledTag} name="add-circled-tag">
    <span>
      Add
      <pre class="inline">&lt;Circled&gt;</pre>
    </span>
  </Checkbox>
</div>

<div class="flex flex-col md:flex-row gap-4 w-full p-4 py-0 md:p-8 md:py-0 m-auto">
  <Textarea name="input" placeholder="Coller le SVG moche ici..." bind:value={input} />
  <Textarea
    name="output"
    placeholder="Copier le SVG transformé ici ! (cliquer pour copier)"
    value={output}
    readonly
    copyable
  />
</div>
