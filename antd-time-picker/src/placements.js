// 自动调整溢出坐标
const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

// 目标偏移量
// const targetOffset = [0, 0];
const targetOffset = [0, 0];

// 位置对象（处理四个边的位置）
const placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
};

export default placements;
