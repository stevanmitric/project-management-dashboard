import React from 'react';

const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#F7DC6F',
  '#8E44AD',
  '#C0392B',
];

const getRandomColor = usedColors => {
  const availableColors = colors.filter(color => !usedColors.includes(color));
  if (availableColors.length === 0)
    return colors[Math.floor(Math.random() * colors.length)];
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

export default function ProfileImage({ usedColors, setUsedColors }) {
  const user = localStorage.getItem('user');

  const parsedUser = JSON.parse(user);

  const firstNamePart = parsedUser?.firstName?.split('');
  const lastNamePart = parsedUser?.lastName?.split('');

  console.log('firstNamePart', firstNamePart);
  console.log('lastNamePart', lastNamePart);

  const firstNameInitial = firstNamePart[0] ? firstNamePart[0][0] : '';
  const lastNameInitial = lastNamePart[1] ? lastNamePart[1][0] : '';

  // Update used colors
  //   setUsedColors([...usedColors]);

  return (
    <span
      style={{
        backgroundColor: '#8E44AD',
        color: '#fff',
        padding: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        lineHeight: '40px',
        fontWeight: 'bold',
        fontSize: '16px',
      }}
    >
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
}
