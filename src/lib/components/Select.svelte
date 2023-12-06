<script lang="ts">
    import { onMount } from "svelte";

    export let options: string[] = [];
    export let selected: string[]|string = "";
    export let multiple = false;

    let optionsCopy = options;
    
    let searchField: HTMLInputElement;
    let searchValue = '';
    let dropdownElement: HTMLDivElement;

    const filter = () => {
        optionsCopy = options.filter( val => val.startsWith( searchValue ) )
    }

    const setSelected = (value: string) => {
        if( selected.includes( value ) ) {
            return selected;
        }

        if( multiple ) {
            return selected = [...selected, value];
        }

        return selected = value;
    }

    onMount( () => {
        dropdownElement.addEventListener('shown.bs.dropdown', () => searchField.focus())
    })
</script>


<div class="dropdown" bind:this={dropdownElement}>
    <div 
        class="form-select cursor-pointer"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
    >
        <span class="text-muted small me-2">Selected status codes:</span>
        {#if multiple}
            {#each selected as value}
                <span class="badge rounded-pill text-bg-success me-1">{ value }</span>
            {/each}
        {:else}
            <span class="badge rounded-pill text-bg-success">{ selected }</span>
        {/if}
    </div>
    <div class="dropdown-menu dropdown-menu-scroll w-100 pt-0">
        <div class="sticky-top bg-body mb-2">
            <form>
                <input 
                    type="text" 
                    class="form-control border-0 px-3" 
                    placeholder="Search status code" 
                    bind:this={searchField}
                    bind:value={searchValue}
                    on:input={filter}
                />
            </form>
        </div>
        {#each optionsCopy as option}
            <a class="dropdown-item" href={'#'} on:click={() => setSelected(option)}>{ option }</a>
        {/each}
    </div>
</div>