CREATE TABLE IF NOT EXISTS greenhouses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  crop VARCHAR(80) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  manager VARCHAR(80) NOT NULL,
  status VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS zones (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(40) NOT NULL UNIQUE,
  greenhouse_code VARCHAR(40) NOT NULL,
  name VARCHAR(120) NOT NULL,
  INDEX idx_zones_greenhouse (greenhouse_code)
);

-- 传感器为独立实体，随育苗季在温室/区域之间转移，当前点位记录于此
CREATE TABLE IF NOT EXISTS sensors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  sensor_type VARCHAR(40) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  greenhouse_code VARCHAR(40) NOT NULL,
  zone_code VARCHAR(40) NOT NULL,
  INDEX idx_sensors_greenhouse (greenhouse_code)
);

-- 点位交接记录：同一传感器下一次交接时间必须晚于上一次（由应用层校验）
CREATE TABLE IF NOT EXISTS sensor_handovers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sensor_code VARCHAR(40) NOT NULL,
  from_greenhouse_code VARCHAR(40) NOT NULL,
  from_zone_code VARCHAR(40) NOT NULL,
  to_greenhouse_code VARCHAR(40) NOT NULL,
  to_zone_code VARCHAR(40) NOT NULL,
  handover_at DATETIME NOT NULL,
  reason VARCHAR(400) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_handovers_sensor_time (sensor_code, handover_at)
);

-- 读数固定记录采集时点位（greenhouse_code/zone_code 为快照），交接前数据留在原处
CREATE TABLE IF NOT EXISTS sensor_readings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sensor_code VARCHAR(40) NOT NULL,
  greenhouse_code VARCHAR(40) NOT NULL,
  zone_code VARCHAR(40) NOT NULL,
  sensor_type VARCHAR(40) NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_readings_sensor_time (sensor_code, captured_at),
  INDEX idx_readings_greenhouse_time (greenhouse_code, captured_at)
);

-- 阈值绑定传感器本身，传感器交接后仍对同一传感器生效
CREATE TABLE IF NOT EXISTS thresholds (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sensor_code VARCHAR(40) NOT NULL,
  sensor_type VARCHAR(40) NOT NULL,
  min_value DECIMAL(12,2) NOT NULL,
  max_value DECIMAL(12,2) NOT NULL,
  UNIQUE KEY uk_thresholds_sensor (sensor_code)
);

CREATE TABLE IF NOT EXISTS alarms (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sensor_code VARCHAR(40) NOT NULL,
  greenhouse_code VARCHAR(40) NOT NULL,
  zone_code VARCHAR(40) NOT NULL,
  sensor_type VARCHAR(40) NOT NULL,
  message VARCHAR(240) NOT NULL,
  level_name VARCHAR(40) NOT NULL,
  handled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_alarms_sensor (sensor_code)
);

CREATE TABLE IF NOT EXISTS devices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  greenhouse_code VARCHAR(40) NOT NULL,
  name VARCHAR(120) NOT NULL,
  device_type VARCHAR(40) NOT NULL,
  online BOOLEAN NOT NULL DEFAULT TRUE,
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  schedule_rule VARCHAR(160) NOT NULL
);

INSERT INTO greenhouses(code, name, crop, area, manager, status)
VALUES ('gh-1', '一号番茄温室', '番茄', 960, '陈晓', 'warning');

INSERT INTO zones(code, greenhouse_code, name) VALUES
  ('z-1a', 'gh-1', '东区'),
  ('z-1b', 'gh-1', '西区');
