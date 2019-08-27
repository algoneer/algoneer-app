```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/', selected: true },
    ]}
/>
```
```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/' },
        { name: 'My projects', url: '/projects', selected: true },
    ]}
/>
```
```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/' },
        { name: 'My projects', url: '/projects' },
        { name: 'Project details', url: '/projects/1', selected: true },
    ]}
/>
```
```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/' },
        { name: 'My projects', url: '/projects' },
        { name: 'Project details', url: '/projects/1' },
        { name: 'Test results', url: '/projects/1/results', selected: true },
    ]}
/>
```
