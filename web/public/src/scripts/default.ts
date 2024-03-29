document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const scrollupButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#scrollupButton');
    const loader: HTMLDivElement = <HTMLDivElement>document.querySelector('#loader');

    scrollupButton.addEventListener('click', () => window.scrollTo(0, 0));

    document.querySelectorAll('a').forEach(a => {
      if (a.getAttribute ('href')?.startsWith ('#'))
      {
        return;
      }

      if (a.target === '_blank')
      {
        return;
      }

      a.addEventListener('click', e => {
        const target: HTMLAnchorElement = <HTMLAnchorElement>(a);

        e.preventDefault();
        loader.style.display = 'block';
        setTimeout(() => {
          loader.style.display = 'none';
          window.location.href = target.href;
        }, 80);
      });
    });
  }
};
