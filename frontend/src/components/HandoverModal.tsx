import { Alert, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { HANDOVER_TIME_FORMAT, SENSOR_LABELS, ZONES } from '../constants/app.constants';
import type { Greenhouse, HandoverPayload, HandoverResult, Sensor, SensorHandover } from '../types/domain';
import { greenhouseName, latestHandoverOf } from '../utils/sensor';

interface HandoverModalProps {
  sensor: Sensor | null;
  greenhouses: Greenhouse[];
  handovers: SensorHandover[];
  onClose: () => void;
  onSubmit: (sensorId: string, payload: HandoverPayload) => Promise<HandoverResult>;
}

interface HandoverFormValues {
  toGreenhouseId: string;
  toZone: string;
  handoverAt: dayjs.Dayjs;
  reason?: string;
}

export const HandoverModal = ({ sensor, greenhouses, handovers, onClose, onSubmit }: HandoverModalProps) => {
  const [form] = Form.useForm<HandoverFormValues>();
  const lastHandover = sensor ? latestHandoverOf(handovers, sensor.id) : undefined;

  useEffect(() => {
    if (sensor) {
      form.setFieldsValue({ handoverAt: dayjs(), toGreenhouseId: undefined, toZone: undefined, reason: undefined });
    }
  }, [sensor, form]);

  const submit = async () => {
    if (!sensor) return;
    const values = await form.validateFields();
    const payload: HandoverPayload = {
      toGreenhouseId: values.toGreenhouseId,
      toZone: values.toZone,
      handoverAt: values.handoverAt.format(HANDOVER_TIME_FORMAT),
      reason: values.reason,
    };
    try {
      const result = await onSubmit(sensor.id, payload);
      if (result.duplicated) {
        message.warning(result.message);
      } else {
        message.success(result.message);
      }
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err instanceof Error ? err.message : '点位交接提交失败');
    }
  };

  return (
    <Modal
      open={sensor !== null}
      title={sensor ? `点位交接 · ${SENSOR_LABELS[sensor.sensorType]}传感器 ${sensor.id}` : '点位交接'}
      okText="提交交接"
      cancelText="取消"
      onOk={submit}
      onCancel={onClose}
      destroyOnClose
    >
      {sensor && (
        <div className="space-y-3">
          <Alert
            type="info"
            showIcon
            message={`当前点位：${greenhouseName(greenhouses, sensor.greenhouseId)} · ${sensor.zone}`}
            description={lastHandover
              ? `上次交接：${lastHandover.handoverAt}，本次交接时间需晚于该时间`
              : '该传感器暂无交接记录'}
          />
          <Form form={form} layout="vertical">
            <Form.Item name="toGreenhouseId" label="目标温室" rules={[{ required: true, message: '请选择目标温室' }]}>
              <Select
                placeholder="选择目标温室"
                options={greenhouses.map((house) => ({ value: house.id, label: house.name }))}
              />
            </Form.Item>
            <Form.Item name="toZone" label="目标种植区" rules={[{ required: true, message: '请选择目标种植区' }]}>
              <Select placeholder="选择种植区" options={ZONES.map((zone) => ({ value: zone, label: zone }))} />
            </Form.Item>
            <Form.Item name="handoverAt" label="交接时间" rules={[{ required: true, message: '请选择交接时间' }]}>
              <DatePicker showTime={{ format: 'HH:mm' }} format={HANDOVER_TIME_FORMAT} className="w-full" />
            </Form.Item>
            <Form.Item name="reason" label="交接原因">
              <Input.TextArea rows={2} placeholder="选填，默认：育苗季点位调整" />
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
};
