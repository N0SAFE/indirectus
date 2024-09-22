export const imports = `
import * as SafeSystemBinding from './bindings/safe-system-binding'
import * as SafeItemBinding from './bindings/safe-item-binding'`

export const TypedClient = `
Safe: {
  {%- for collection in registry.collections | filter_untype_system_collections %}

  {% set collectionName = collection.name | to_collection_name %}
  {% set collectionType = ["Collections.", collection.name | to_collection_name] | join %}
  {% set genericQuery = ["const Query extends Directus.Query<CollectionsType, ", collectionType, ">"] | join %}
  {% set applyType  = ["ApplyQueryFields<CollectionsType, ", collectionType, ", Query['fields']>"] | join %}

  {% if collection.is_system %}

  {% if not collection.is_singleton %}
    /**
     * Manages safely multiple items from the {{ collection.name.raw | to_collection_name }} collection.
     */
    {{ collection.name | to_collection_name | pluralize | to_collection_string  }}: SafeSystemBinding.{{ collectionName }}Items;

    /**
     * Manages safely individual items from the {{ collection.name.raw | to_collection_name }} collection.
     */
    {{ collection.name | to_collection_name | singularize | to_collection_string  }}: SafeSystemBinding.{{ collectionName }}Item;
  {% else %}

    /**
     * Manage the only {{ collection.name.raw | to_collection_name }} instance available
     */
    {{ collection.name | to_collection_name | to_collection_string  }}: SafeSystemBinding.{{ collectionName }}Singleton;
    
    {% endif %}

  {% else %}

  {% if not collection.is_singleton %}
    /**
     * Manages safely multiple items from the {{ collection.name.raw | to_collection_name }} collection.
     */
    {{ collection.name | to_collection_name | pluralize | to_collection_string  }}: SafeItemBinding.{{ collectionName }}Items;

    /**
     * Manages safely individual items from the {{ collection.name.raw | to_collection_name }} collection.
     */
    {{ collection.name | to_collection_name | singularize | to_collection_string  }}: SafeItemBinding.{{ collectionName }}Item;
  {% else %}

    /**
     * Manage the only {{ collection.name.raw | to_collection_name }} instance available.
     */
    {{ collection.name | to_collection_name | to_collection_string  }}: SafeItemBinding.{{ collectionName }}Singleton;
    
    {% endif %}

  {% endif %}

  {%- endfor %}
} & {[K in keyof SystemBinding.Requests]: SafeSystemBinding.Requests[K]}`;

export const schema = `
[
  'Safe',
  Object.fromEntries([
    {% for collection in registry.collections | filter_untype_system_collections %}
    {% if collection.is_system %}

    {% if not collection.is_singleton %}
          [{{ collection.name | to_collection_name | pluralize | to_collection_string }}, new SafeSystemBinding.{{ collection.name | to_collection_name }}Items(client as any)],
          [{{ collection.name | to_collection_name | singularize | to_collection_string }}, new SafeSystemBinding.{{ collection.name | to_collection_name }}Item(client as any)],
    {% else %}
          [{{ collection.name | to_collection_name | to_collection_string }}, (query: any) => {
            return client.request(SafeSystemBinding.read{{ collection.name | to_collection_name }}(query));
          }],
    {% endif %}

    {% else %}

    {% if not collection.is_singleton %}
          [{{ collection.name | to_collection_name | pluralize | to_collection_string }}, new SafeItemBinding.{{ collection.name | to_collection_name }}Items(client as any)],
          [{{ collection.name | to_collection_name | singularize | to_collection_string }}, new SafeItemBinding.{{ collection.name | to_collection_name }}Item(client as any)],
    {% else %}
          [{{ collection.name | to_collection_name | to_collection_string }}, (query: any) => {
            return client.request(SafeItemBinding.read{{ collection.name | to_collection_name }}(query));
          }],
    {% endif %}
    {% endif %}
    {% endfor %}
  ])
]`
