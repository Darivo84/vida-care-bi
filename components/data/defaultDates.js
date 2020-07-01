// default dates
export const today = new Date().toJSON().slice(0, 10);

export const firstDay = new Date();

export const lastDay = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() + 8
    
  );
export const nextweek = lastDay.toJSON().slice(0, 10);

export const previousWeek = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() - 6
  )
    .toJSON()
    .slice(0, 10);

export const twoWeeks = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() - 14
    )
    .toJSON()
    .slice(0, 10);
//