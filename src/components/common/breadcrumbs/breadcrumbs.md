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
        { name: 'My algorithms', url: '/algorithms', selected: true },
    ]}
/>
```
```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/' },
        { name: 'My algorithms', url: '/algorithms' },
        { name: 'Algorithm details', url: '/algorithms/1', selected: true },
    ]}
/>
```
```jsx
<Breadcrumbs
    links={[
        { name: 'Algoneer', url: '/' },
        { name: 'My algorithms', url: '/algorithms' },
        { name: 'Algorithm details', url: '/algorithms/1' },
        { name: 'Test results', url: '/algorithms/1/results', selected: true },
    ]}
/>
```
